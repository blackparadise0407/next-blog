import type { AppProps } from 'next/app';

import { Layout } from '@/components/Layout';
import { AuthProvider } from '@/contexts/auth';

import 'tailwindcss/tailwind.css';
import '../styles/globals.css';
import '../styles/imports.css';
import '../styles/variables.css';

function BlogApp({ Component, pageProps }: AppProps) {
    return (
        <AuthProvider>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </AuthProvider>
    );
}

export default BlogApp;
