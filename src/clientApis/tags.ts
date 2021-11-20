import { request } from 'clientApis';

const tagsApi = {
    getAll: (q: string) => {
        return request<ApiResponse<ITag[]>>('get', '/api/tags', { q });
    },
    getCommon: () => {
        return request<ApiResponse<ITag[]>>('get', '/api/tags/common');
    },
    create: (data: ITag) => {
        return request<ApiResponse<ITag>>('post', '/api/tags', data);
    },
    update: (uid: string, data: Partial<ITag>) => {
        return request<ApiResponse<ITag>>('put', `/api/tags/${uid}`, data);
    },
};

export default tagsApi;
