const firebaseConfig = {
  apiKey: "AIzaSyAcEoF4omZwWdS9w3qPiHLnlM6bQdWb31Y",
  authDomain: "phane-fbc42.firebaseapp.com",
  projectId: "phane-fbc42",
  storageBucket: "phane-fbc42.appspot.com",
  messagingSenderId: "830382007221",
  appId: "1:830382007221:web:edb508e1570f23f4976ffc",
  measurementId: "G-WBNBX2V5RN"
};

firebase.initializeApp(firebaseConfig);
var database = firebase.database();

function writeData(data, key) {
  firebase.database().ref(key).set({
    value: data
  });
}

function readData(key) {
  var value;
  var ref = firebase.database().ref(key);
  ref.on('value', function(snapshot) {
    value = snapshot.val().value;
  });
  return value;
}

function signIn(email, password) {
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      var user = userCredential.user;
      console.log('User signed in:', user);
      window.location.href='game.html';
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      window.alert('Error signing in');
      console.log('Error signing in:', errorCode, errorMessage);
    });
}
