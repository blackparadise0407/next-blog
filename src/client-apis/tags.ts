import { request } from 'client-apis';

const tagsApi = {
    getAll: (q: string) => {
        return request<ApiResponse<ITag[]>>('get', '/api/tags', { q });
    },
    getCommon: (
        query: { q?: string; type?: 'common' } = { q: '', type: 'common' }
    ) => {
        return request<ApiResponse<ITag[]>>('get', '/api/tags', { query });
    },
    create: (data: ITag) => {
        return request<ApiResponse<ITag>>('post', '/api/tags', data);
    },
    update: (uid: string, data: Partial<ITag>) => {
        return request<ApiResponse<ITag>>('put', `/api/tags/${uid}`, data);
    },
};

export default tagsApi;
