import firebase from 'firebase'
var config = {
  apiKey: "AIzaSyDcf0AjmrLn6KMSfJpDYDDpTgA_G_29Qq0",
  authDomain: "links-bookmark.firebaseapp.com",
  databaseURL: "https://links-bookmark.firebaseio.com",
  projectId: "links-bookmark",
  storageBucket: "links-bookmark.appspot.com",
  messagingSenderId: "1083100098874"
};
var fire = firebase.initializeApp(config);
export default fire;