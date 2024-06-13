// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getDatabase } from 'firebase/database';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCCm64xe-pG7HnQQg4SVuDYISBaYIpL0gY",
    authDomain: "evaluacion-semana-ii.firebaseapp.com",
    databaseURL: "https://evaluacion-semana-ii-default-rtdb.firebaseio.com",
    projectId: "evaluacion-semana-ii",
    storageBucket: "evaluacion-semana-ii.appspot.com",
    messagingSenderId: "173656574290",
    appId: "1:173656574290:web:1023d616813eab4d9fd28b"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
//constante para obtener servicio de autenticación
export const auth = getAuth(firebase);
// export const auth = initializeAuth(firebase, {
//     persistence: getReactNativePersistence(ReactNativeAsyncStorage)
// });

// Referencia al servicio de la BDD
export const dbRealTime = getDatabase(firebase);

