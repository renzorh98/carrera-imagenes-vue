import {ALEGRA_API_SERVER} from "./HOSTSERVER"
import axios from "axios";

const service = axios.create({
    baseURL: ALEGRA_API_SERVER
})

service.interceptors.request.use(
    (config) =>
    {
        config.headers.Authorization = `Basic ${ window.localStorage.getItem('token') }]}`
        return config;
    },
    (err) => {
        Promise.reject(err)
    }
);

export const get = async (url, params, options) => {
    if (params === void 0) {
        params = {};
    }
    if (options === void 0) {
        options = {};
    }
    return service.get(url, {...options, params})
}

export const post = async (url, data, options) => {
    if (options === void 0) {
        options = {};
    }
    return service.post(url, data, {...options})
}