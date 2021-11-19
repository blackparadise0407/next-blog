import { useRouter } from 'next/router';

import { BackdropLoader } from '@/components/BackdropLoader';
import { useAuthContext } from '@/contexts/auth';
import useDidMountEffect from '@/hooks/useDidMountEffect';

const withAuth = (Component: PrismPage) => {
    const Auth = (props: any) => {
        const router = useRouter();
        const { isAuth } = useAuthContext();

        useDidMountEffect(() => {
            if (!isAuth) router.replace('/');
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [isAuth]);

        if (!isAuth) return <BackdropLoader />;
        return <Component {...props} />;
    };

    // Copy getInitial props so it will run as well
    if (Component.getInitialProps) {
        Auth.getInitialProps = Component.getInitialProps;
    }

    return Auth;
};

export default withAuth;
