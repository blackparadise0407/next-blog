import { useRouter } from 'next/router';

export default function BlogDetail() {
    const router = useRouter();
    console.log(router);

    return <p>BLog detail</p>;
}
