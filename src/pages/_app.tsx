import type { AppProps } from 'next/app';

import { Layout } from '@/components/Layout';
import { AuthProvider } from '@/contexts/auth';
import { ToastProvider } from '@/contexts/toast';

import 'tailwindcss/tailwind.css';
import '../styles/globals.css';
import '../styles/imports.css';
import '../styles/variables.css';

function BlogApp({ Component, pageProps }: AppProps) {
    return (
        <ToastProvider>
            <AuthProvider>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </AuthProvider>
        </ToastProvider>
    );
}

export default BlogApp;
