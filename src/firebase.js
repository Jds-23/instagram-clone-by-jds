import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
        apiKey: "AIzaSyAJCgjWFKeJ0qIk97Zw9_Xxmi2PtoiiFx4",
        authDomain: "instagram-by-jds.firebaseapp.com",
        databaseURL: "https://instagram-by-jds.firebaseio.com",
        projectId: "instagram-by-jds",
        storageBucket: "instagram-by-jds.appspot.com",
        messagingSenderId: "791831962120",
        appId: "1:791831962120:web:55b45defc5b368cbc267bd",
        measurementId: "G-RZY09DFB1J"
    }
);

const db=firebaseApp.firestore();
const auth=firebase.auth();
const storage=firebase.storage();

export {db,auth,storage};