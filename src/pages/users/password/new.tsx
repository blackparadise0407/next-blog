import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useFormik } from 'formik';

import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { Label } from '@/components/Label';
import { useToast } from '@/contexts/toast';
import { useAuthContext } from '@/contexts/auth';

export default function ForgotPasswordPage() {
    const router = useRouter();
    const { enqueue } = useToast();
    const { isAuth, loading, handleSendPasswordResetEmail } = useAuthContext();
    const { values, handleChange, handleSubmit } = useFormik({
        initialValues: {
            email: '',
        },
        onSubmit: (values) => {
            const { email } = values;
            if (!email) {
                enqueue('Email is required!', {
                    variant: 'error',
                });
            } else {
                handleSendPasswordResetEmail(email);
            }
        },
    });

    useEffect(() => {
        if (isAuth) router.replace('/');
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAuth]);

    return (
        <div className="mt-5 flex items-center justify-center">
            <div className="w-[512px] bg-white rounded-md border px-4 sm:px-8 md:px-12 py-8 flex flex-col">
                <div className="text-base md:text-xl font-bold tracking-normal mb-5">
                    Forgot your password?
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <Label name="Email">
                        <Input
                            id="email"
                            name="email"
                            type="text"
                            onChange={handleChange}
                            value={values.email}
                        />
                    </Label>
                    <Button
                        loading={loading}
                        htmlType="submit"
                        block
                        size="middle"
                        type="primary"
                    >
                        Send me reset password instructions
                    </Button>
                </form>
            </div>
        </div>
    );
}
