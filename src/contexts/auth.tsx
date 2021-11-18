import {
    createContext,
    ReactNode,
    useCallback,
    useContext,
    useEffect,
    useState,
} from 'react';
import {
    getAuth,
    signInWithEmailAndPassword,
    signInWithPopup,
    UserCredential,
    User,
} from 'firebase/auth';
import { FirebaseError } from '@firebase/util';
import Cookies from 'js-cookie';

import firebase from 'utils/firebase';
import { google, github } from 'utils/providers';
import { useToast } from './toast';
import { useRouter } from 'next/router';

const initialState: IAuthContext = {
    loading: false,
    user: undefined,
    isAuth: false,
    handleEmailPasswordSignIn: () => {},
    handleExternalLogin: () => {},
    handleSignOut: () => {},
};

const auth = getAuth(firebase);

const AuthContext = createContext<IAuthContext>(initialState);

type AuthProviderProps = {
    children: ReactNode | JSX.Element;
};

export function AuthProvider({ children }: AuthProviderProps) {
    const [state, setState] = useState<IAuthContext>(initialState);
    const router = useRouter();
    const { enqueue } = useToast();

    const handleEmailPasswordSignIn = useCallback(
        ({ username, password }: { username: string; password: string }) => {
            setState({ ...state, loading: true });
            signInWithEmailAndPassword(auth, username, password)
                .then((userCredential: UserCredential) => {
                    const user = userCredential.user;
                    user.getIdToken()
                        .then((res) => Cookies.set('accessToken', res))
                        .catch((_) => {});

                    setState({ ...state, loading: false, user, isAuth: true });
                })
                .catch(() => {
                    enqueue('Wrong username or password', { variant: 'error' });
                    setState({
                        ...state,
                        loading: false,
                        isAuth: false,
                    });
                });
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        []
    );

    const handleExternalLogin = useCallback((type: 'google' | 'github') => {
        const provider = type === 'google' ? google : github;
        setState({ ...state, loading: true });
        signInWithPopup(auth, provider)
            .then((userCredential: UserCredential) => {
                const user = userCredential.user;
                user.getIdToken()
                    .then((res) => Cookies.set('accessToken', res))
                    .catch((_) => {});
                setState({ ...state, loading: false, user, isAuth: true });
            })
            .catch(() => {
                setState({
                    ...state,
                    loading: false,
                    isAuth: false,
                });
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const loadCurrentUser = useCallback(() => {
        auth.onAuthStateChanged(
            (user) => {
                if (!!user) {
                    const basicInfo = {
                        displayName: user.displayName,
                        email: user.email,
                        uid: user.uid,
                    };
                    sessionStorage.setItem('user', JSON.stringify(basicInfo));
                    if (
                        JSON.parse(sessionStorage.getItem('user') || '{}')
                            ?.uid !== user.uid
                    ) {
                        setState({ ...state, user: undefined, isAuth: false });
                    } else {
                        setState({ ...state, user, isAuth: true });
                    }
                }
            },
            () => {
                enqueue('Unexpected error happened', { variant: 'error' });
                setState({
                    ...state,
                    user: undefined,
                    isAuth: false,
                });
            }
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleSignOut = useCallback(() => {
        setState({ ...state, loading: true });
        auth.signOut().then(
            () => {
                sessionStorage.removeItem('user');
                setState({
                    ...state,
                    isAuth: false,
                    user: undefined,
                    loading: false,
                });
                enqueue('Sign out success', { variant: 'success' });
                router.push('/');
            },
            () => {
                enqueue('Unexpected error happened', { variant: 'error' });
                setState({
                    ...state,
                    isAuth: false,
                    user: undefined,
                    loading: false,
                });
            }
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        setState((prev) => ({
            ...prev,
            isAuth: !!sessionStorage.getItem('user'),
            user: {
                ...prev.user,
                ...JSON.parse(sessionStorage.getItem('user') || '{}'),
            },
        }));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        loadCurrentUser();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <AuthContext.Provider
            value={{
                ...state,
                handleEmailPasswordSignIn,
                handleExternalLogin,
                handleSignOut,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuthContext() {
    return useContext(AuthContext);
}
