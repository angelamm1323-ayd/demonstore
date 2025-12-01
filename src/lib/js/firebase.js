// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
    getAuth,
    signInWithEmailAndPassword,
    signOut as firebaseSignOut,
    onAuthStateChanged
} from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDjT4p_mCEzBYb-P_-eF4RdxCmpUcCh4rU",
    authDomain: "demonstore-d0fdc.firebaseapp.com",
    projectId: "demonstore-d0fdc",
    storageBucket: "demonstore-d0fdc.firebasestorage.app",
    messagingSenderId: "778708834628",
    appId: "1:778708834628:web:c232d5a9a2f996ca389f11"
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// Auth functions
export const signIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
};

export const signOut = () => {
    return firebaseSignOut(auth);
};

export const onAuthChange = (callback) => {
    return onAuthStateChanged(auth, callback);
};

export {
    app,
    db,
    auth
};