import Axios from 'axios';
import { resolveRequest } from '../helper/helper';

const BASE_URL = process.env.REACT_APP_API_URL;

const axiosInstance = Axios.create({
    baseURL: BASE_URL,
});

export const makeRequest = {
    get: (url, params, headers = {}) => resolveRequest(axiosInstance.get(url, { params, headers })),
    post: (url, data, headers = {}) => resolveRequest(axiosInstance.post(url, data, { headers })),
    put: (url, data, headers = {}) => resolveRequest(axiosInstance.put(url, data, { headers })),
    delete: (url, data, headers = {}) => resolveRequest(axiosInstance.delete(url, { data, headers })),
};

export default makeRequest;

