import {
    createContext,
    ReactNode,
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

const initialState: IAuthContext = {
    loading: false,
    user: undefined,
    error: undefined,
    isAuth: false,
    handleEmailPasswordSignIn: () => {},
    handleExternalLogin: () => {},
};

const auth = getAuth(firebase);

const AuthContext = createContext<IAuthContext>(initialState);

type AuthProviderProps = {
    children: ReactNode | JSX.Element;
};

export function AuthProvider({ children }: AuthProviderProps) {
    const [state, setState] = useState<IAuthContext>(initialState);

    const handleEmailPasswordSignIn = ({
        username,
        password,
    }: {
        username: string;
        password: string;
    }) => {
        setState({ ...state, loading: true });
        signInWithEmailAndPassword(auth, username, password)
            .then((userCredential: UserCredential) => {
                const user = userCredential.user;
                user.getIdToken()
                    .then((res) => Cookies.set('accessToken', res))
                    .catch((_) => {});

                setState({ ...state, loading: false, user, isAuth: true });
            })
            .catch((error: FirebaseError) => {
                setState({
                    ...state,
                    loading: false,
                    error: error.message,
                    isAuth: false,
                });
            });
    };

    const handleExternalLogin = (type: 'google' | 'github') => {
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
            .catch((error: FirebaseError) => {
                setState({
                    ...state,
                    loading: false,
                    error: error.message,
                    isAuth: false,
                });
            });
    };

    const loadCurrentUser = () => {
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
            (err) => {
                setState({
                    ...state,
                    user: undefined,
                    isAuth: false,
                    error: err.message,
                });
            }
        );
    };

    useEffect(() => {
        setState((prev) => ({
            ...prev,
            isAuth: !!sessionStorage.getItem('user'),
            user: {
                ...prev.user,
                ...JSON.parse(sessionStorage.getItem('user') || '{}'),
            },
        }));
    }, []);

    useEffect(() => {
        loadCurrentUser();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <AuthContext.Provider
            value={{ ...state, handleEmailPasswordSignIn, handleExternalLogin }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuthContext() {
    return useContext(AuthContext);
}
