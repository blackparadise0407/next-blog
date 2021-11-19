import Link from 'next/link';
import { ReactNode } from 'react';
import clsx from 'clsx';
import { Logo } from '@/components/Logo';
import { Button } from '@/components/Button';

type Props = {
    children: ReactNode | string;
};

export default function ArticleLayout({ children }: Props) {
    return (
        <div className="relative grid grid-cols-10 gap-x-10 bg-gray-100 h-screen px-2 md:px-20 xl:px-48 overflow-y-hidden">
            {children}
        </div>
    );
}
