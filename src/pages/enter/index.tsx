/* eslint-disable @next/next/no-html-link-for-pages */
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useFormik } from 'formik';
import { AiOutlineGithub, AiOutlineGoogle } from 'react-icons/ai';

import { Button } from '@/components/Button';
import { Label } from '@/components/Label';
import { Input } from '@/components/Input';
import { useToast } from '@/contexts/toast';
import { useUser } from '@auth0/nextjs-auth0';

type Props = {};

const EnterPage: PrismPage = ({}: Props) => {
    const router = useRouter();
    const { state } = router.query;
    const { user, isLoading } = useUser();
    const { enqueue } = useToast();

    const { values, handleChange, handleSubmit } = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
        onSubmit: (values) => {},
    });

    useEffect(() => {
        if (!!user) {
            router.replace('/');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

    return (
        <div className="flex items-center justify-center">
            <div className="w-[512px] bg-white rounded-md border px-4 sm:px-8 md:px-12 py-8 flex flex-col">
                <div className="text-base md:text-xl text-center font-bold tracking-normal mb-5">
                    Welcome to Blog community
                </div>
                <div className="space-y-2">
                    <Button
                        block
                        size="large"
                        icon={<AiOutlineGoogle size={20} />}
                        type="danger"
                    >
                        Sign in with your Google account
                    </Button>
                    <Button
                        block
                        size="large"
                        icon={<AiOutlineGoogle size={20} />}
                        type="primary"
                        className="!bg-black hover:!bg-gray-800"
                    >
                        Sign in with your Google account
                    </Button>
                    <Button
                        block
                        className="!bg-black hover:!bg-gray-800"
                        size="large"
                        icon={<AiOutlineGithub size={20} />}
                        type="primary"
                    >
                        Sign in with your Github account
                    </Button>
                </div>
                <div className="flex-grow"></div>
                <div className="relative w-full text-xs text-center my-6">
                    Already have an account?{' '}
                    <span className="text-blue-600 hover:text-blue-500 transition-colors underline">
                        <Link href="/enter">Log in</Link>
                    </span>
                </div>
                {state !== 'new-user' && (
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* <Label name="Username">
                            <Input
                                id="username"
                                name="username"
                                type="text"
                                onChange={handleChange}
                                value={values.username}
                            />
                        </Label>
                        <Label name="Password">
                            <Input
                                id="password"
                                name="password"
                                onChange={handleChange}
                                value={values.password}
                                type="password"
                            />
                        </Label> */}
                        <Button
                            loading={isLoading}
                            htmlType="button"
                            block
                            size="large"
                            type="primary"
                        >
                            <a href="/api/auth/login">
                                Continue with your account
                            </a>
                        </Button>
                        <p className="text-xs text-blue-600 text-center">
                            <Link href="/users/password/new">
                                I forgot my password
                            </Link>
                        </p>
                    </form>
                )}
            </div>
        </div>
    );
};

EnterPage.layout = 'common';

export default EnterPage;
