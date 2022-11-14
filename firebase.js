// Import the functions you need from the SDKs you need
//import * as firebase from "firebase";


import { initializeApp } from "firebase/app";
import { getAuth} from "firebase/auth";
import { getFirestore} from "firebase/firestore/lite"; 

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDchfTkYNrlOv50VqGTmr_mXjy6w0SN-7M",
  authDomain: "storeprojectreactnative.firebaseapp.com",
  projectId: "storeprojectreactnative",
  storageBucket: "storeprojectreactnative.appspot.com",
  messagingSenderId: "108524561040",
  appId: "1:108524561040:web:777277ed2006ef5a84ae15"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

/*let app;
if(firebase.apps.length === 0){
    app = firebase.initializeApp(firebaseConfig);
}else{
    app = firebase.app()
}

const auth = firebase.auth();

const db = getFirestore(app2);*/

export {auth, db}