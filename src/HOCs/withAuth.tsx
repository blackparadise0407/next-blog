import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { getSession, useUser } from '@auth0/nextjs-auth0';
import useDidMountEffect from '@/hooks/useDidMountEffect';

const withAuth = (Component: PrismPage) => {
    const Auth = (props: any) => {
        const router = useRouter();
        const { user, isLoading } = useUser();
        // useDidMountEffect(() => {
        //     if (!user) router.replace('/');
        //     // eslint-disable-next-line react-hooks/exhaustive-deps
        // }, [user]);

        // if (isLoading || !user) return null;
        return <Component {...props} />;
    };

    // Copy getInitial props so it will run as well
    if (Component.getInitialProps) {
        Auth.getInitialProps = Component.getInitialProps;
    }

    return Auth;
};

export default withAuth;
