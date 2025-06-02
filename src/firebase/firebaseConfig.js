import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBLp0RN2lugTTp8lW-b8tuXru9PRE5croo",
  authDomain: "react-login-app-496ca.firebaseapp.com",
  projectId: "react-login-app-496ca",
  storageBucket: "react-login-app-496ca.firebasestorage.app",
  messagingSenderId: "1087321460636",
  appId: "1:1087321460636:web:1757349404d4c711300259"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

