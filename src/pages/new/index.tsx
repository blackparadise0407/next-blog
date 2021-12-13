import blogsApi from '@/client-apis/blogs';
import { ArticleForm, ArticleValue } from '@/components/ArticleForm';
import { Button } from '@/components/Button';
import { useToast } from '@/contexts/toast';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { useCallback } from 'react';
import { AiOutlineClose } from 'react-icons/ai';

const NewBlogPage: PrismPageWithAuth = withPageAuthRequired(() => {
    const { enqueue } = useToast();
    const handlePublish = useCallback(async (v: ArticleValue, cb: ErrorCb) => {
        try {
            const { tags, title, content, cover_photo } = v;
            const blog: Partial<IBlog> = {
                title,
                content,
                cover_photo,
                tags: tags.map((i) => i.value),
            };
            const { message } = await blogsApi.create(blog);
            enqueue(message, { variant: 'success' });
            cb(null);
        } catch (e: any) {
            enqueue(e, { variant: 'error' });
            cb(e);
        }
    }, []);
    return (
        <>
            <div className="absolute top-0 right-0">
                <Button icon={<AiOutlineClose />} />
            </div>
            <ArticleForm onPublish={handlePublish} />
        </>
    );
});

NewBlogPage.isPrivate = true;

export default NewBlogPage;
