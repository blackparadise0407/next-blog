import type { AppProps } from 'next/app';
import { Layout } from 'components';

import 'tailwindcss/tailwind.css';
import '../styles/globals.css';
import '../styles/imports.css';
import '../styles/variables.css';
import { AuthProvider } from 'contexts/auth';

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
