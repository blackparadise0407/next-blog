import clsx from 'clsx';
import { ReactNode, useCallback, memo } from 'react';
import { AiOutlineLoading } from 'react-icons/ai';

type ButtonType = 'primary' | 'secondary' | 'danger' | 'default' | 'ghost';

type ButtonSize = 'large' | 'small' | 'middle';

type ButtonProps = {
    className?: string;
    type?: ButtonType;
    children?: ReactNode | JSX.Element;
    icon?: ReactNode | JSX.Element;
    block?: boolean;
    size?: ButtonSize;
    loading?: boolean;
    htmlType?: 'button' | 'submit' | 'reset';
    onClick?: () => void;
};

const getColorFromType = (type: ButtonType) => {
    switch (type) {
        case 'primary':
            return 'bg-blue-600 text-white hover:bg-blue-700 focus:bg-blue-500';
        case 'secondary':
            return 'bg-blue-400 text-white hover:bg-blue-600 focus:bg-blue-300';
        case 'default':
            return 'bg-white text-black hover:bg-gray-50 !border-gray-300 focus:text-blue-400 focus:!border-blue-400';
        case 'danger':
            return 'bg-red-500 text-white hover:bg-red-600 focus:bg-red-400';
        case 'ghost':
            return 'bg-white text-black hover:bg-gray-100 focus:bg-gray-100';
        default:
            return '';
    }
};

const getButtonSize = (size: ButtonSize) => {
    switch (size) {
        case 'small':
            return 'text-xs sm:text-sm px-2 py-1';
        case 'middle':
            return 'text-xs sm:text-sm px-3 py-2';
        case 'large':
            return 'text-xs sm:text-sm md:text-base px-4 py-2.5';
        default:
            return '';
    }
};

function Button({
    className = '',
    onClick,
    type = 'default',
    children,
    icon,
    loading = false,
    size = 'middle',
    htmlType = 'button',
    block = false,
}: ButtonProps) {
    const handleOnClick = useCallback(() => {
        onClick?.();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <button
            type={htmlType}
            onClick={handleOnClick}
            className={clsx(
                getButtonSize(size),
                getColorFromType(type),
                'flex text-center items-center font-normal md:font-medium rounded-md transition-colors border border-transparent outline-none',
                className,
                block && 'w-full',
                loading && '!opacity-90 pointer-events-none'
            )}
        >
            <div className="flex-grow"></div>
            {icon && !loading && (
                <div className={clsx(!!children && 'mr-2')}>{icon}</div>
            )}
            {loading && (
                <AiOutlineLoading
                    className="mr-2 animate-spin text-white"
                    size={16}
                />
            )}
            {children}
            <div className="flex-grow"></div>
        </button>
    );
}

export default memo(Button);
