import axios from "axios";

const axiosInstance = axios.create({
    // baseURL:`https://my-edugenix-project-server-site.vercel.app`
    baseURL:`http://localhost:3000`
    
})
const useAxios = () => {
    return axiosInstance;
};

export default useAxios;
