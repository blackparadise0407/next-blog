import clsx from 'clsx';
import { ReactNode, useCallback, memo, ReactElement, HTMLProps } from 'react';
import { AiOutlineLoading } from 'react-icons/ai';

type ButtonType = 'primary' | 'secondary' | 'danger' | 'default' | 'ghost';

type ButtonSize = 'large' | 'small' | 'middle';

type ButtonProps = {
    type?: ButtonType;
    icon?: ReactNode | JSX.Element;
    block?: boolean;
    size?: ButtonSize;
    loading?: boolean;
    htmlType?: 'button' | 'submit' | 'reset';
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
            return 'text-xs sm:text-sm px-2.5 py-1';
        case 'middle':
            return 'text-xs sm:text-sm !leading-5 px-3.5 py-2';
        case 'large':
            return 'text-xs sm:text-sm md:text-base px-4 py-3';
        default:
            return '';
    }
};

function Button({
    className = '',
    type = 'default',
    children,
    icon,
    loading = false,
    size = 'middle',
    htmlType = 'button',
    block = false,
    ...rest
}: ButtonProps & Omit<HTMLProps<HTMLButtonElement>, 'size'>) {
    return (
        <button
            type={htmlType}
            className={clsx(
                getButtonSize(size),
                getColorFromType(type),
                'flex text-center items-center font-normal md:font-medium rounded-md transition-colors border border-transparent outline-none',
                className,
                block && 'w-full',
                loading && '!opacity-90 pointer-events-none'
            )}
            {...rest}
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
