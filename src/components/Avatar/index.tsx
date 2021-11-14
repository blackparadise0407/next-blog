import Image from 'next/image';
import clsx from 'clsx';

type AvatarProps = {
    className?: string;
    size?: number;
    url?: string | any;
};

export default function Avatar({
    className = '',
    size = 35,
    url = 'https://ui-avatars.com/api/?name=&background=0D8ABC&color=fff',
}: AvatarProps) {
    return (
        <div
            className={clsx(
                'rounded-[50%] hover:ring-4 ring-gray-200 transition-shadow overflow-hidden',
                className
            )}
            style={{
                width: `${size}px`,
                height: `${size}px`,
            }}
        >
            <Image src={url} width={size} height={size} alt="user-avatar" />
        </div>
    );
}
