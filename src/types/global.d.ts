import {
    UserProfile,
    WithPageAuthRequired,
    WithPageAuthRequiredProps,
} from '@auth0/nextjs-auth0';
import { Document, Mongoose } from 'mongoose';
import { NextPage } from 'next';
import { AppProps } from 'next/app';
import { FC } from 'react';

declare global {
    var mongoose: any;

    type PrismAppProps = Omit<AppProps, 'Component'> & {
        Component: PrismPage;
    };

    type PrismPage = NextPage & {
        layout?: 'common' | 'article' | undefined;
        isPrivate?: boolean | undefined;
    };

    type ImageType = 'avatar' | 'article';
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

    interface UserDoc extends Document, UserProfile {}

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
        thumbnail: IAttachment;
        title: string;
        tags: Array<ITag>;
        path: string;
        like_count: number;
        comment_count: number;
        content: string;
    }
    interface ITag extends Document {
        name: string;
        description: string;
        used_score: number;
    }

    interface IUserProfile extends Document {
        work: string;
        education: string;
        phone_number: string;
        user_credential: string;
        avatar: IAttachment;
    }

    interface IAttachment extends Document {
        type: ImageType;
        url: string;
    }

    interface ApiResponse<T> {
        data?: T;
        message?: string;
    }
}
