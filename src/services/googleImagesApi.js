import {GOOGLE_IMAGES_API_SERVER} from "./HOSTSERVER"
import axios from "axios";

const service = axios.create({
    baseURL: GOOGLE_IMAGES_API_SERVER
})

export const get = async (url, params, options) => {
    if (params === void 0) {
        params = {};
    }
    if (options === void 0) {
        options = {};
    }
    return service.get(url, {...options, params})
}
