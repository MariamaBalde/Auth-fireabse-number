import { initializeApp } from "firebase/app";
import { getAuth, RecaptchaVerifier} from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAhn_o_EmL3GvklUaFFmoTELCz10OIN514",
    authDomain: "auth-3743a.firebaseapp.com",
    projectId: "auth-3743a",
    storageBucket: "auth-3743a.appspot.com",
    messagingSenderId: "118983116974",
    appId: "1:118983116974:web:19cc1eed18733f16a2853f",
    measurementId: "G-QKQSXG5DZ5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
// export const window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {});
export const initializeRecaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {});
};