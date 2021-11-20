import { AxiosRequestConfig, Method } from 'axios';
import fetcher from 'utils/fetcher';

async function request<T>(method: Method, url: string, data?: any) {
    const config: AxiosRequestConfig = {
        method,
        url,
    };

    if (method === 'GET' || method === 'get') {
        config.params = data;
    } else config.data = data;

    return (await fetcher.request(config)) as T;
}

export default request;
