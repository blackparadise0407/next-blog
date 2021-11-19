import { useRouter } from 'next/router';

const BlogDetail: PrismPage = () => {
    const router = useRouter();

    return <p>BLog detail</p>;
};

BlogDetail.layout = 'common';

export default BlogDetail;
