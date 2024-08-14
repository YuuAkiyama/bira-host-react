import { initializeApp } from "firebase/app";

// TODO: env
export function initialize() {
  const firebaseConfig = {
    apiKey: "AIzaSyAHEumGeMCv4Qmy-LjPTQV0R5tj7I6XxWY",
    authDomain: "bira-host-st.firebaseapp.com",
    projectId: "bira-host-st",
    storageBucket: "bira-host-st.appspot.com",
    messagingSenderId: "283707259407",
    appId: "1:283707259407:web:70f82df214b80e7534417a",
  };
  initializeApp(firebaseConfig);
}

// TODO: env
export const BUCKET_NAME = "gs://bira-host-st.appspot.com";
