import { ReactNode, useCallback } from 'react';
import clsx from 'clsx';

type IconButtonProps = {
    className?: string;
    size?: number;
    icon: ReactNode | JSX.Element;
    onClick?: () => void;
};

export default function IconButton({
    className = '',
    size = 35,
    icon,
    onClick,
}: IconButtonProps) {
    const handleOnClick = useCallback(() => {
        onClick?.();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <div
            className={clsx(
                'rounded-full bg-white shadow cursor-pointer grid hover:shadow-md ring-gray-200 transition place-items-center',
                className
            )}
            style={{ width: `${size}px`, height: `${size}px` }}
        >
            {icon}
        </div>
    );
}
