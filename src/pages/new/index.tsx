import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { ArticleForm } from '@/components/ArticleForm';
import axios from 'axios';

const NewBlogPage: PrismPage = ({
    tags,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
    return <ArticleForm />;
};

export const getStaticProps: GetStaticProps = async () => {
    const { data } = await axios.get('http://localhost:3000/api/tags');
    const tags: ITag[] = data.data;
    return {
        props: {
            tags,
        },
    };
};

NewBlogPage.layout = 'article';
NewBlogPage.isPrivate = true;

export default NewBlogPage;
