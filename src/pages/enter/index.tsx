import Link from 'next/link';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import { AiOutlineGithub, AiOutlineGoogle } from 'react-icons/ai';

import { useAuthContext } from 'contexts/auth';
import { Button } from '@/components/Button';
import { Label } from '@/components/Label';
import { Input } from '@/components/Input';

type Props = {};

export default function EnterPage({}: Props) {
    const router = useRouter();
    const { state } = router.query;
    const { isAuth, loading, handleEmailPasswordSignIn, handleExternalLogin } =
        useAuthContext();

    const { values, handleChange, handleSubmit } = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
        onSubmit: (values) => {
            const { username, password } = values;
            handleEmailPasswordSignIn({ username, password });
        },
    });

    useEffect(() => {
        if (isAuth) {
            router.push('/');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAuth]);

    return (
        <div className="flex items-center justify-center">
            <div className="bg-white rounded-md border px-4 sm:px-8 md:px-12 py-8 md:py-10 flex flex-col">
                <div className="text-2xl font-bold text-center tracking-normal mb-5">
                    Welcome to Blog community
                </div>
                <div className="space-y-2">
                    <Button
                        block
                        size="large"
                        icon={<AiOutlineGoogle size={20} />}
                        type="primary"
                        className="!bg-black hover:!bg-gray-800"
                        onClick={() => handleExternalLogin('google')}
                    >
                        Sign in with your Google account
                    </Button>
                    <Button
                        block
                        className="!bg-black hover:!bg-gray-800"
                        size="large"
                        icon={<AiOutlineGithub size={20} />}
                        type="primary"
                        onClick={() => handleExternalLogin('github')}
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
                        <Label name="Username">
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
                        </Label>
                        <Button
                            loading={loading}
                            htmlType="submit"
                            block
                            size="large"
                            type="primary"
                        >
                            Continue
                        </Button>
                        <p className="text-xs text-blue-600 text-center">
                            <Link href="/forgot-password">
                                I forgot my password
                            </Link>
                        </p>
                    </form>
                )}
            </div>
        </div>
    );
}
