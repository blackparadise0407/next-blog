import { User } from '@firebase/auth';
import { Document, Mongoose } from 'mongoose';
import { NextPage } from 'next';
import { AppProps } from 'next/app';

declare global {
    var mongoose: any;

    type PrismAppProps = Omit<AppProps, 'Component'> & {
        Component: PrismPage;
    };

    type PrismPage = NextPage & {
        layout?: 'common' | 'article' | undefined;
        isPrivate?: boolean | undefined;
    };
    interface IAuthContext {
        user: User | undefined;
        isAuth: boolean;
        loading: boolean;
        handleEmailPasswordSignIn: ({
            username,
            password,
        }: {
            username: string;
            password: string;
        }) => void;
        handleExternalSignIn: (type: 'google' | 'github') => void;
        handleSendPasswordResetEmail: (email: string) => void;
        handleSignOut: () => void;
    }

    type ToastVariant = 'info' | 'success' | 'warning' | 'error';

    interface IToastOptions {
        variant?: ToastVariant;
        title?: string;
    }

    interface IToastContext {
        items: Array<IToastItem>;
        enqueue: (message: string, options?: IToastOptions = {}) => void;
    }

    interface IToastItem extends Omit<IToastOptions, 'title'> {
        id: string;
        title?: string;
        description: string;
    }

    interface IBlog extends Document {
        thumbnail: string;
        title: string;
        tags: Array<ITag>;
        path: string;
        likeCount: number;
        commentCount: number;
        content: string;
    }
    interface ITag extends Document {
        name: string;
        description: string;
        used_score: number;
    }

    interface ApiResponse<T> {
        data?: T;
        message?: string;
    }
}
