import { request } from 'client-apis';

const blogsApi = {
    create: (blog: Partial<IBlog>) => {
        return request<ApiResponse<IBlog>>('post', '/api/blogs', blog);
    },
};

export default blogsApi;
