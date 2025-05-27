import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, FacebookAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDHQfcWpDoESCC22k9pdQds7t8RQWykyTU",
  authDomain: "lexinary-f8283.firebaseapp.com",
  projectId: "lexinary-f8283",
  storageBucket: "lexinary-f8283.appspot.com", 
  messagingSenderId: "242345196530",
  appId: "1:242345196530:web:d7597479bf6232ec7e896b"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

// Hàm đăng nhập Google
export const signInWithGoogle = () => {
  return signInWithPopup(auth, googleProvider);
}

// Hàm đăng nhập Facebook
export const signInWithFacebook = () => {
  return signInWithPopup(auth, facebookProvider);
}
