import { ReactNode } from 'react';
import clsx from 'clsx';

import { Footer, Header } from 'components';

import styles from './styles.module.css';

type Props = {
    children: ReactNode | string;
};

export default function Layout({ children }: Props) {
    return (
        <div className="relative min-h-screen">
            <Header />
            <main
                className={clsx(
                    styles.main,
                    'px-2 py-4 xl:px-32 xl:py-6 bg-gray-100'
                )}
            >
                {children}
            </main>
            <Footer />
        </div>
    );
}
