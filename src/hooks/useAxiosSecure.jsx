// import axios from 'axios';
// import React from 'react';
// import useAuth from './useAuth';
// import { useNavigate } from 'react-router';
// const axiosSecure = axios.create({
//     // baseURL:`https://my-edugenix-project-server-site.vercel.app`
//     baseURL:`http://localhost:3000`
    
// })
// const useAxiosSecure = () => {
//     const {user,logOut} = useAuth();
//     // console.log(user)
//     const navigate = useNavigate();
//     axiosSecure.interceptors.request.use(config=>{
//         config.headers.Authorization = `Bearer ${user.accessToken}`
//         return config;
//     },error=>{
//         return Promise.reject(error);
//     })
   
//     axiosSecure.interceptors.response.use(res=>{
//         return res;
//     },error=>{
//         console.log('inside res interceptors',error.response.status)
//         const status = error.response.status;
//         if(status === 403){
//             navigate("/forbidden")
//         }
//         else if (status === 401) {
//             logOut()
//                 .then(() => {
//                     navigate('/login')
//                 })
//                 .catch(() => { })
//         }


//         return Promise.reject(error);
//     })
//     return axiosSecure;
// };

// export default useAxiosSecure;

import axios from 'axios';
import { useEffect } from 'react';
import useAuth from './useAuth';
import { useNavigate } from 'react-router';

const axiosSecure = axios.create({
    baseURL:`https://my-edugenix-project-server-site.vercel.app`
    // baseURL: 'http://localhost:3000'
});

const useAxiosSecure = () => {
    const { user, logOut } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const requestInterceptor = axiosSecure.interceptors.request.use(
            (config) => {
                if (user?.accessToken) {
                    config.headers.Authorization = `Bearer ${user.accessToken}`;
                }

                return config;
            },
            (error) => {
                return Promise.reject(error);
            }
        );

        const responseInterceptor = axiosSecure.interceptors.response.use(
            (response) => {
                return response;
            },
            (error) => {
                const status = error.response?.status;

                console.log('Axios error status:', status);

                if (status === 403) {
                    navigate('/forbidden');
                }

                if (status === 401) {
                    logOut()
                        .then(() => {
                            navigate('/login');
                        })
                        .catch(() => {});
                }

                return Promise.reject(error);
            }
        );

        return () => {
            axiosSecure.interceptors.request.eject(requestInterceptor);
            axiosSecure.interceptors.response.eject(responseInterceptor);
        };
    }, [user, logOut, navigate]);

    return axiosSecure;
};

export default useAxiosSecure;