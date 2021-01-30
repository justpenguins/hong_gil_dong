// These samples are intended for Web so this import would normally be
// done in HTML however using modules here is more convenient for
// ensuring sample correctness offline.
import firebase from "firebase/app";
import "firebase/auth";

// TODO: Replace the following with your app's Firebase project configuration
// For Firebase JavaScript SDK v7.20.0 and later, `measurementId` is an optional field
var firebaseConfig = {
  apiKey: "AIzaSyCk4-BTub75RIgSpNpokrjN2DMzKE5hBPg",
  authDomain: "robinh00d.firebaseapp.com",
  projectId: "robinh00d",
  storageBucket: "robinh00d.appspot.com",
  messagingSenderId: "1027244661635",
  appId: "1:1027244661635:web:651abd4b024226889934b6",
  measurementId: "G-MH5Y2133N6"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

export function signInWithEmailPassword() {
  var email = "test@example.com";
  var password = "hunter2";
  // [START auth_signin_password]
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      var user = userCredential.user;
      // ...
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
    });
  // [END auth_signin_password]
}

export function signUpWithEmailPasswoerd() {
  var email = "test@example.com";
  var password = "hunter2";
  // [START auth_signup_password]
  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in 
      var user = userCredential.user;
      // ...
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      // ..
    });
  // [END auth_signup_password]
}

export function sendEmailVerification() {
  // [START auth_send_email_verification]
  let auth: any = firebase.auth() //idk if this will work but it's not erroring so we;ll leave it for now
  auth.currentUser.sendEmailVerification()
    .then(() => {
      // Email verification sent!
      // ...
    });
  // [END auth_send_email_verification]
}

export function sendPasswordReset() {
  const email = "sam@example.com";
  // [START auth_send_password_reset]
  firebase.auth().sendPasswordResetEmail(email)
    .then(() => {
      // Password reset email sent!
      // ..
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      // ..
    });
  // [END auth_send_password_reset]
}