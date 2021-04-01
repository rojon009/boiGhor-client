import firebase from 'firebase/app';
import 'firebase/auth';
import firebaseConfig from './firebase.config';

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();

const provider = new firebase.auth.GoogleAuthProvider();

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export const createUserWithEmailAndPassword = (email, password) => auth.createUserWithEmailAndPassword(email, password);

export const signInWithEmailAndPassword = (email, password) => auth.signInWithEmailAndPassword(email, password);

export default firebase;