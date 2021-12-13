import Blogs from '@/models/blogs';
import { UserProfile } from '@auth0/nextjs-auth0';

export async function create(user: UserProfile, blog: IBlog): Promise<IBlog> {
    blog.user_id = user.sub;
    const normalizeBlogTitle = blog.title
        .normalize('NFC')
        .toLowerCase()
        .split(' ')
        .join('-');
    blog.path = `${user.name}/${normalizeBlogTitle}`;
    const newBlog = new Blogs(blog);
    const savedBlog = await newBlog.save();
    return savedBlog;
}
