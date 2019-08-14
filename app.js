(function() {

//Inicializar Firebase
// Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyBBGcnGod6D4FH8WOVO6DfFjYiEDlcONdI",
    authDomain: "fuerzam-5c257.firebaseapp.com",
    databaseURL: "https://fuerzam-5c257.firebaseio.com",
    projectId: "fuerzam-5c257",
    storageBucket: "fuerzam-5c257.appspot.com",
    messagingSenderId: "576616764100",
    appId: "1:576616764100:web:dd65426083a988a7"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);


  // Obtener elementos
  const txtEmail = document.getElementById('txtEmail');
  const txtPassword = document.getElementById('txtPassword');
  const btnLogin = document.getElementById('btnLogin');
  const btnSignUp = document.getElementById('btnSignUp');
  const btnLogout = document.getElementById('btnLogout');

  // Añadir Evento login
  btnLogin.addEventListener('click', e => {
    //Obtener email y pass
    const email = txtEmail.value;
    const pass = txtPassword.value;
    const auth = firebase.auth();
    // Sign in
    const promise = auth.signInWithEmailAndPassword(email, pass);
    promise.catch(e => console.log(e.message));   
  });

  // Añadir evento signup
  btnSignUp.addEventListener('click', e => {
    // Obtener email y pass
    // TODO: comprobar que el email sea real
    const email = txtEmail.value;
    const pass = txtPassword.value;
    const auth = firebase.auth();
    // Sign in
    const promise = auth.createUserWithEmailAndPassword(email, pass);
    promise.catch(e => console.log(e.message));
  });

  btnLogout.addEventListener('click', e => {
    firebase.auth().signOut();
  });

  // Añadir un listener en tiempo real
   firebase.auth().onAuthStateChanged( firebaseUser => {
    if(firebaseUser) {
      console.log(firebaseUser);
      btnLogout.classList.remove('hide');
    } else {
      console.log('no logueado');
      btnLogout.classList.add('hide');
    }    
  });
} ());
