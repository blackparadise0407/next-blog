import qs from 'query-string';
import axios from 'axios';

const fetcher = axios.create({
    baseURL: 'http://localhost:3000',
    headers: {
        'Content-Type': 'application/json',
    },
    paramsSerializer: (params) => qs.stringify(params),
});

fetcher.interceptors.request.use(async (conf) => {
    return conf;
});

fetcher.interceptors.response.use(
    (resp) => {
        if (resp && resp.data) return resp.data;
        return resp;
    },
    (err) => {
        return Promise.reject(new Error(err.message));
    }
);

export default fetcher;
