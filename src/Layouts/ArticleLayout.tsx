import { ReactNode } from 'react';

type Props = {
    children: ReactNode | string;
};

export default function ArticleLayout({ children }: Props) {
    return (
        <div className="relative grid grid-cols-10 gap-x-0 md:gap-x-10 bg-gray-100 h-screen px-2 md:px-20 xl:px-48 overflow-y-hidden">
            {children}
        </div>
    );
}
