import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyCRRR_GB097EK6ScVPwfcFe_p5caCS1FLA",
    authDomain: "app-gommista.firebaseapp.com",
    databaseURL: "https://app-gommista-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "app-gommista",
    storageBucket: "app-gommista.appspot.com",
    messagingSenderId: "530585791222",
    appId: "1:530585791222:web:043e7c08875f0846c3dad7"
  };
  //initialize firebase 

  const db = initializeApp(firebaseConfig);

  export default db;