import { initializeApp } from 'firebase/app';
import {getAuth, signOut, GithubAuthProvider, signInWithPopup, onAuthStateChanged, GoogleAuthProvider } from 'firebase/auth';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCWHsCj2nSzuLbi9vkv_xbkZsNWY3uruaA',
  authDomain: 'devtter-2ba07.firebaseapp.com',
  projectId: 'devtter-2ba07',
  storageBucket: 'devtter-2ba07.appspot.com',
  messagingSenderId: '247193003256',
  appId: '1:247193003256:web:7dc8a5dd7ba5481a9c470d',
  measurementId: 'G-1GJRY9Q587',
};

!initializeApp(firebaseConfig) && initializeApp(firebaseConfig);

const mapFirebaseUser = (user) => {
  if (user) {
    const { displayName, email, photoURL } = user;
    return {
      avatar: photoURL,
      username: displayName,
      email,
    };
  }
  return null;
};

export const userStateChange = (onChange) => onAuthStateChanged(getAuth(), (user) => {
  const normalizedUser = mapFirebaseUser(user);
  onChange(normalizedUser);
});

export const loginWithGitHub = () => {
  const gitHubProvider = new GithubAuthProvider();
  return signInWithPopup(getAuth(), gitHubProvider);
};

export const loginWithGoogle = () => {
  const googleProvider = new GoogleAuthProvider();
  return signInWithPopup(getAuth(), googleProvider);
};

export const logout = () => signOut(getAuth());
