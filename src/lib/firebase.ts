import { initializeApp } from "firebase/app";

// TODO: env
export function initialize() {
  const firebaseConfig = {
    apiKey: 'AIzaSyCOZkfTmv7PW-zD-rrHTeNfVZr4egfbVUY',
    authDomain: 'bira-host-ts.firebaseapp.com',
    projectId: 'bira-host-ts',
    storageBucket: 'bira-host-ts.appspot.com',
    messagingSenderId: '406406167951',
    appId: '1:406406167951:web:160aba1747709581b55ffa'
  };
  initializeApp(firebaseConfig);
}

// TODO: env
export const BUCKET_NAME = "gs://bira-host-ts.appspot.com";
