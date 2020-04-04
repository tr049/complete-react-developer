import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';


const firebaseConfig = {
    apiKey: "AIzaSyC4l-I297X_pAxCr2O2tIXjFbvM4AHgTlU",
    authDomain: "complete-react-course-db.firebaseapp.com",
    databaseURL: "https://complete-react-course-db.firebaseio.com",
    projectId: "complete-react-course-db",
    storageBucket: "complete-react-course-db.appspot.com",
    messagingSenderId: "920544948161",
    appId: "1:920544948161:web:94b1fc3a44c3dc0a064940",
    measurementId: "G-EP01W0JWZS"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) {
        return;
    }

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if(!snapShot.exists) {
        const {displayName, email} = userAuth;
        const createdAt = new Date();

        try{
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            });
        } catch(error) {
            console.log('Error creating user', error.message);
        }
    }
    
    return userRef;
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'});

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;