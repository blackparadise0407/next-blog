import { ReactNode } from 'react';
import clsx from 'clsx';

import { Footer } from '../Footer';
import { Header } from '../Header';

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
                    'p-2 xl:px-32 xl:py-6 bg-gray-100'
                )}
            >
                {children}
            </main>
            <Footer />
        </div>
    );
}
