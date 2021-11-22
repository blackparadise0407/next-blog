import clsx from 'clsx';
import { memo, useCallback, useEffect, useState } from 'react';
import {
    AiOutlineCheckCircle,
    AiOutlineClose,
    AiOutlineCloseCircle,
    AiOutlineInfoCircle,
    AiOutlineWarning,
} from 'react-icons/ai';

type ToastItemProps = {
    data: IToastItem;
    autoClose?: number;
    icon?: JSX.Element;
    onDelete: (id: string) => void;
};

const _renderIconFromVariant = (variant: ToastVariant): JSX.Element | null => {
    switch (variant) {
        case 'info':
            return (
                <AiOutlineInfoCircle className="mr-2 text-blue-500" size={25} />
            );
        case 'success':
            return (
                <AiOutlineCheckCircle
                    className="mr-2 text-green-500"
                    size={25}
                />
            );
        case 'warning':
            return (
                <AiOutlineWarning className="mr-2 text-yellow-500" size={25} />
            );
        case 'error':
            return (
                <AiOutlineCloseCircle
                    className="self-center mr-2 text-red-500"
                    size={25}
                />
            );
        default:
            return null;
    }
};

const getClassFromVariant = (
    variant: ToastVariant
): { extra: string; title: string; description: string } => {
    switch (variant) {
        case 'info':
            return {
                extra: 'bg-blue-500',
                title: 'text-blue-500',
                description: 'text-blue-500',
            };
        case 'success':
            return {
                extra: 'bg-green-500',
                title: 'text-green-500',
                description: 'text-green-500',
            };
        case 'error':
            return {
                extra: 'bg-red-500',
                title: 'text-red-500',
                description: 'text-red-500',
            };
        case 'warning':
            return {
                extra: 'bg-yellow-500',
                title: 'text-yellow-500',
                description: 'text-yellow-500',
            };
        default:
            return { extra: '', title: '', description: '' };
    }
};

function ToastItem({ data, autoClose = 3000, icon, onDelete }: ToastItemProps) {
    const { id: uid, title = '', description, variant = 'info' } = data;
    const [classN, setClassN] = useState('animate-slide-in');

    useEffect(() => {
        const interval = setInterval(() => {
            if (!!autoClose) {
                onDelete(uid);
            }
        }, autoClose);
        const _interval = setInterval(() => {
            if (!!autoClose) {
                setClassN('animate-slide-out');
            }
        }, +autoClose - 600);
        return () => {
            clearInterval(interval);
            clearInterval(_interval);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleDelete = useCallback(() => {
        setClassN('animate-slide-out');
        setTimeout(() => {
            onDelete(uid);
        }, 600);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (!data) return null;

    return (
        <div
            key={uid}
            className={clsx(
                'relative flex items-center bg-white pl-4 pr-6 py-3 shadow-lg rounded-md max-w-xs w-72 overflow-hidden',
                classN && classN
            )}
        >
            {icon ? icon : _renderIconFromVariant(variant)}
            <div className="flex flex-col">
                {title && (
                    <span
                        className={clsx(
                            'text-base font-medium',
                            getClassFromVariant(variant).title
                        )}
                    >
                        {title}
                    </span>
                )}
                <span
                    className={clsx(
                        'text-xs',
                        getClassFromVariant(variant).description
                    )}
                >
                    {description}
                </span>
            </div>
            <span
                className={clsx(
                    'absolute top-2 right-2 cursor-pointer',
                    getClassFromVariant(variant).description
                )}
                onClick={handleDelete}
            >
                <AiOutlineClose />
            </span>
            <div
                className={clsx(
                    'absolute top-0 left-0 bottom-0 w-1',
                    getClassFromVariant(variant).extra
                )}
            ></div>
        </div>
    );
}

export default memo(ToastItem);
