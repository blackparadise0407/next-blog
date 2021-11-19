import { useRouter } from 'next/router';

const BlogDetail: PrismPage = () => {
    const { query } = useRouter();

    return <div>{query.path}</div>;
};

BlogDetail.layout = 'common';
BlogDetail.isPrivate = true;

export default BlogDetail;
