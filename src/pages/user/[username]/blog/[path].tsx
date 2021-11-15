import { useRouter } from 'next/router';

export default function BlogDetail() {
    const { query } = useRouter();

    return <div>{query.path}</div>;
}
