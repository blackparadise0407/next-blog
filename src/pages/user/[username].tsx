import { useRouter } from 'next/router';

export default function UserPage() {
    const router = useRouter();
    const { username } = router.query;

    return <p>Post: {username}</p>;
}
