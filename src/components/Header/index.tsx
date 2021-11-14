import { useRouter } from 'next/router';
import clsx from 'clsx';
import { User } from '@firebase/auth';

import { Avatar, Button, Input } from 'components';
import { useAuthContext } from 'contexts/auth';

import styles from './styles.module.css';

type Props = {};

function _renderUser(user: User | undefined): JSX.Element | null {
    if (!user) return null;
    return (
        <div>
            <div className="relative">
                <Avatar
                    className={styles.avatar}
                    url={user?.photoURL}
                    size={35}
                />
                <div
                    className={clsx(
                        'absolute w-64 bg-white top-10 right-0 p-2 rounded-md border shadow-xl hidden animate-appear',
                        styles.popover
                    )}
                >
                    <ul className="space-y-2 text-xs md:text-sm">
                        <div className="flex flex-col px-4 py-2 transition-colors hover:bg-gray-100 cursor-pointer rounded-md">
                            <span className="text-sm truncate text-black font-medium">
                                {user?.displayName}
                            </span>
                            <span className="text-xs truncate text-gray-400">
                                {user?.email}
                            </span>
                        </div>
                        <hr />
                        <li className="hover:bg-gray-100 transition-colors hover:text-blue-500 rounded-md cursor-pointer px-4 py-2.5">
                            Profile
                        </li>
                        <li className="hover:bg-gray-100 transition-colors hover:text-blue-500 rounded-md cursor-pointer px-4 py-2.5">
                            Dashboard
                        </li>
                        <li className="hover:bg-gray-100 transition-colors hover:text-blue-500 rounded-md cursor-pointer px-4 py-2.5">
                            Setting
                        </li>
                        <hr />
                        <li className="hover:bg-gray-100 transition-colors hover:text-blue-500 rounded-md cursor-pointer px-4 py-2.5">
                            Sign Out
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default function Header({}: Props) {
    const router = useRouter();
    const { isAuth, user } = useAuthContext();

    const handleGoToLogin = () => {
        router.push('/enter');
    };

    const handleGoToSignUp = () => {
        router.push('/enter?state=new-user', {
            query: {
                state: 'new-user',
            },
        });
    };

    return (
        <div
            className={clsx(
                styles.header,
                'w-full bg-white shadow-sm border-b px-2 xl:px-32 flex items-center'
            )}
        >
            <div className="font-bold text-blue-600 text-2xl uppercase tracking-wider">
                Prism
            </div>
            <Input
                className="ml-5 w-96 hidden md:block"
                placeholder="Search..."
            />
            <div className="flex-grow"></div>
            <ul className="space-x-2 xl:space-x-5 flex">
                {isAuth ? (
                    _renderUser(user)
                ) : (
                    <>
                        <Button onClick={handleGoToLogin} type="ghost">
                            Login
                        </Button>
                        <Button onClick={handleGoToSignUp} type="primary">
                            Create account
                        </Button>
                    </>
                )}
            </ul>
        </div>
    );
}
