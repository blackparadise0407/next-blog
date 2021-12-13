import dynamic from 'next/dynamic';
import { UserProvider } from '@auth0/nextjs-auth0';
import { useEffect } from 'react';

import { ToastProvider } from '@/contexts/toast';

import '../styles/globals.css';
import '../styles/imports.css';
import '../styles/variables.css';
import 'tailwindcss/tailwind.css';
import 'prismjs/themes/prism-okaidia.css';

const layouts = {
    common: dynamic(import('../layouts/CommonLayout')),
    article: dynamic(import('../layouts/ArticleLayout')),
};

function Prism({ Component, pageProps }: PrismAppProps) {
    const Layout = Component.layout
        ? layouts[Component.layout]
        : ({ children }: any) => <>{children}</>;

    // useEffect(() => {
    //     PrismJs.highlightAll();
    // });

    // const ProtectedComponent = Component.isPrivate
    //     ? withAuth(Component)
    //     : Component;

    return (
        <UserProvider>
            <ToastProvider>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </ToastProvider>
        </UserProvider>
    );
}

export default Prism;
