import { GoogleAuthProvider, GithubAuthProvider } from 'firebase/auth';

const google = new GoogleAuthProvider();
const github = new GithubAuthProvider();

export { google, github };
