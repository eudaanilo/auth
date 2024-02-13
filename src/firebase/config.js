import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDV97q13UGISdKJZs1t9JkY-kmQojSgW8s",
  authDomain: "fir-auth-b1855.firebaseapp.com",
  projectId: "fir-auth-b1855",
  storageBucket: "fir-auth-b1855.appspot.com",
  messagingSenderId: "792736042063",
  appId: "1:792736042063:web:fc6faec8922021c3d02e3a"
};

const app = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(app);

export default firebaseAuth;