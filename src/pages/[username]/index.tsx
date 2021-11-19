import { useRouter } from 'next/router';

const UserPage: PrismPage = () => {
    const router = useRouter();
    const { username } = router.query;

    return <p>Username: {username}</p>;
};

UserPage.layout = 'common';

export default UserPage;
