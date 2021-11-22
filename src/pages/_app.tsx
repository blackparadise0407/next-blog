import dynamic from 'next/dynamic';
import { UserProvider } from '@auth0/nextjs-auth0';

import { AuthProvider } from '@/contexts/auth';
import { ToastProvider } from '@/contexts/toast';

import 'tailwindcss/tailwind.css';
import '../styles/globals.css';
import '../styles/imports.css';
import '../styles/variables.css';

const layouts = {
    common: dynamic(import('../layouts/CommonLayout')),
    article: dynamic(import('../layouts/ArticleLayout')),
};

function Prism({ Component, pageProps }: PrismAppProps) {
    const Layout = Component.layout
        ? layouts[Component.layout]
        : ({ children }: any) => <>{children}</>;

    // const ProtectedComponent = Component.isPrivate
    //     ? withAuth(Component)
    //     : Component;

    return (
        <UserProvider>
            <ToastProvider>
                <AuthProvider>
                    <Layout>
                        <Component {...pageProps} />
                    </Layout>
                </AuthProvider>
            </ToastProvider>
        </UserProvider>
    );
}

export default Prism;
