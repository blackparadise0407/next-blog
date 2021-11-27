import { ArticleForm } from '@/components/ArticleForm';
import { Button } from '@/components/Button';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { AiOutlineClose } from 'react-icons/ai';

const NewBlogPage: PrismPageWithAuth = withPageAuthRequired(() => {
    return (
        <>
            <div className="absolute top-0 right-0">
                <Button icon={<AiOutlineClose />} />
            </div>
            <ArticleForm />
        </>
    );
});

NewBlogPage.isPrivate = true;

export default NewBlogPage;
