import { initializeApp } from 'firebase/app';

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FB_API_KEY,
    authDomain: 'blog-bb4a3.firebaseapp.com',
    projectId: 'blog-bb4a3',
    storageBucket: 'blog-bb4a3.appspot.com',
    messagingSenderId: '564382447383',
    appId: process.env.NEXT_PUBLIC_FB_APP_ID,
};

const firebase = initializeApp(firebaseConfig);

export default firebase;
