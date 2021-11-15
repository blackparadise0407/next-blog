import { memo } from 'react';
import clsx from 'clsx';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

import { useTrigger } from 'hooks';

type InputType = 'text' | 'password';

type InputProps = {
    className?: string;
    type?: InputType;
    bordered?: boolean;
    [key: string]: any;
};

function Input({
    className,
    type = 'text',
    bordered = true,
    ...rest
}: InputProps) {
    const { isOpen: isShow, trigger } = useTrigger(false);
    return (
        <div className={clsx(className, 'relative')}>
            <input
                className={clsx(
                    bordered && 'border border-gray-200',
                    type === 'password' ? 'pr-8' : 'pr-2',
                    'w-full text-sm rounded-md transition focus:ring-2 focus:ring-purple-400 focus:border-transparent focus:outline-none pl-2 py-2'
                )}
                type={
                    type === 'password' ? (isShow ? 'text' : 'password') : type
                }
                {...rest}
            />
            {type === 'password' && (
                <div className="absolute text-xl text-gray-400 cursor-pointer top-1/2 transform -translate-y-1/2 right-2">
                    {isShow ? (
                        <AiOutlineEye onClick={trigger} />
                    ) : (
                        <AiOutlineEyeInvisible onClick={trigger} />
                    )}
                </div>
            )}
        </div>
    );
}

export default memo(Input);
