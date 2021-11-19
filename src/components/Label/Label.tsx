import clsx from 'clsx';
import { ReactNode } from 'react';

type Props = {
    className?: string;
    name: string;
    children?: ReactNode | JSX.Element;
};

export default function Label({ className = '', name, children }: Props) {
    return (
        <div className={clsx('text-xs md:text-sm', className)}>
            <label>{name}</label>
            <div className="my-2">{children}</div>
        </div>
    );
}
