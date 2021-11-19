import { User } from '@firebase/auth';

declare global {
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
        uid: string;
        title?: string;
        description: string;
    }

    interface IBlog {
        uid: string;
        thumbnail: string;
        title: string;
        tags: Array<ITag>;
        path: string;
        likeCount: number;
        commentCount: number;
    }

    interface ITag {
        uid: string;
        name: string;
    }
}
