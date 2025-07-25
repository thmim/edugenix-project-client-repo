import axios from "axios";

const axiosInstance = axios.create({
    baseURL:`https://my-edugenix-project-server-site.vercel.app`
})
const useAxios = () => {
    return axiosInstance;
};

export default useAxios;