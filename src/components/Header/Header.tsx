/* eslint-disable @next/next/no-html-link-for-pages */
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import clsx from 'clsx';
import { UserProfile, useUser } from '@auth0/nextjs-auth0';
import { get } from 'lodash';

import { Avatar } from '@/components/Avatar';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';

import styles from './styles.module.css';
import { Logo } from '../Logo';

type Props = {};

function _renderUser(user: UserProfile | undefined): JSX.Element | null {
    if (!user) return null;
    return (
        <div>
            <div className="relative">
                <Avatar
                    className={styles.avatar}
                    url={get(user, 'picture', '')}
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
                                {get(user, 'name', '')}
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
                            <a href="/api/auth/logout">
                                <div>Sign Out</div>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default function Header({}: Props) {
    const router = useRouter();
    // const { isAuth, user, handleSignOut } = useAuthContext();
    const { user } = useUser();

    const handleGoToLogin = useCallback(() => {
        router.push('/enter');
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleGoToSignUp = useCallback(() => {
        router.push('/enter?state=new-user', {
            query: {
                state: 'new-user',
            },
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleGoToCreateBlog = useCallback(() => {
        router.push('/new');
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div
            className={clsx(
                styles.header,
                'w-full bg-white shadow-sm border-b px-2 xl:px-32 flex items-center'
            )}
        >
            <Logo />
            <Input
                className="ml-5 w-96 hidden md:block"
                placeholder="Search..."
            />
            <div className="flex-grow"></div>
            <ul className="space-x-2 xl:space-x-5 flex">
                {!!user ? (
                    <div className="flex items-center space-x-5">
                        <Button onClick={handleGoToCreateBlog} type="primary">
                            Create Post
                        </Button>
                        {_renderUser(user)}
                    </div>
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
