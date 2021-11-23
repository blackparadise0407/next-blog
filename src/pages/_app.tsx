import dynamic from 'next/dynamic';
import { UserProvider } from '@auth0/nextjs-auth0';
import { useEffect } from 'react';

import { AuthProvider } from '@/contexts/auth';
import { ToastProvider } from '@/contexts/toast';
// import Prismjs from 'prismjs';
// import 'prismjs/components/prism-python.min';
// import 'prismjs/components/prism-java.min';
// import 'prismjs/components/prism-javascript.min';
// import 'prismjs/components/prism-go.min';
// import 'prismjs/components/prism-yaml.min';
// import 'prismjs/components/prism-typescript.min';
// import 'prismjs/components/prism-css.min';
// import 'prismjs/components/prism-markup.min';
// import 'prismjs/components/prism-powershell.min';
// import 'prismjs/components/prism-jsx.min';
// import 'prismjs/components/prism-tsx.min';
// import 'prismjs/components/prism-json.min';
// import 'prismjs/components/prism-jsx.min';
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
