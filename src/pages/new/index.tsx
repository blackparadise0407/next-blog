import { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';
import { ArticleForm } from '@/components/ArticleForm';
import axios from 'axios';
import request from '@/clientApis/request';
import tagsApi from '@/clientApis/tags';
import {
    withPageAuthRequired,
    WithPageAuthRequiredProps,
} from '@auth0/nextjs-auth0';

const NewBlogPage: PrismPage = withPageAuthRequired(() => {
    return <ArticleForm />;
});

// export const getStaticProps: GetStaticProps = async () => {
//     const resp = await tagsApi.getAll('');
//     const tags: ITag[] | undefined = resp?.data;
//     return {
//         props: {
//             tags,
//         },
//     };
// };

NewBlogPage.layout = 'article';
NewBlogPage.isPrivate = true;

export default NewBlogPage;
