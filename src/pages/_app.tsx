import type { AppProps } from 'next/app';
import { NextPage } from 'next';
import dynamic from 'next/dynamic';

import { AuthProvider } from '@/contexts/auth';
import { ToastProvider } from '@/contexts/toast';
import withAuth from '@/HOCs/withAuth';

import 'tailwindcss/tailwind.css';
import '../styles/globals.css';
import '../styles/imports.css';
import '../styles/variables.css';

const layouts = {
    common: dynamic(import('../Layouts/CommonLayout')),
    article: dynamic(import('../Layouts/ArticleLayout')),
};

function Prism({ Component, pageProps }: PrismAppProps) {
    const Layout = Component.layout
        ? layouts[Component.layout]
        : ({ children }: any) => <>{children}</>;

    const ProtectedComponent = Component.isPrivate
        ? withAuth(Component)
        : Component;

    return (
        <ToastProvider>
            <AuthProvider>
                <Layout>
                    <ProtectedComponent {...pageProps} />
                </Layout>
            </AuthProvider>
        </ToastProvider>
    );
}

export default Prism;
