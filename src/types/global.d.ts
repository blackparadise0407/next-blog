import { User } from '@firebase/auth';

declare global {
    interface IAuthContext {
        user: User | undefined;
        isAuth: boolean;
        loading: boolean;
        error: string | undefined;
        handleEmailPasswordSignIn: ({
            username,
            password,
        }: {
            username: string;
            password: string;
        }) => void;
        handleExternalLogin: (type: 'google' | 'github') => void;
    }

    interface IBlog {
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
