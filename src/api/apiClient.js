import axios from "axios";
import { CONFIG } from "../config";
import { authHeader } from "../core/funcs";

const apiClient = axios.create({
    baseUrl: CONFIG.API_URL
});

apiClient.interceptors.request.use(function (config) {
    config.headers = authHeader();
    return config;
}, (error) => {
    return Promise.reject(error)
});

export default apiClient