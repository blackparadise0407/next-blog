import qs from 'query-string';
import axios from 'axios';
import { get } from 'lodash';

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
        const errorMessage =
            get(err, ['response', 'data', 'message']) || err.message;
        return Promise.reject(errorMessage);
    }
);

export default fetcher;
