// --- TODO ESTE BLOQUE DE CONFIGURACIÓN DEBES SUSTITUIRLO POR EL DE TU PROYECTO
const config = {
  apiKey: "AIzaSyDzXYZ2qhyieMkfs9aiLUpChEh8U-qAEcE",
  authDomain: "storash-azzxe.firebaseapp.com",
  databaseURL: "https://storash-azzxe.firebaseio.com",
  projectId: "storash-azxxe",
  storageBucket: "storash-azxxe.appspot.com",
  messagingSenderId: "569123715582"
};
firebase.initializeApp(config);

document.querySelector('.bCerrar').addEventListener( 'click', e => {
  loading( true )
  firebase.auth().signOut()
  .then(()=>{
      loading( false )
    })
})

document.querySelector('.bIniciar')
.addEventListener('click', e => {
  const provider = new firebase.auth.GoogleAuthProvider();
  loading( true )
  firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE)
  .then(function() {
    // Existing and future Auth states are now persisted in the current
    // session only. Closing the window would clear any existing state even
    // if a user forgets to sign out.
    // ...
    // New sign-in will be persisted with session persistence.
    return firebase.auth()
    .signInWithPopup( provider )
    .then(()=>{
      loading( false )
    })
    .catch( err => {
      console.log( 1, err )
      document.querySelector( '.bIniciar.oculto' ) && document.querySelector( '.bIniciar.oculto' ).classList.remove( 'oculto' )
    });
  })
  .catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
  });
})

firebase.auth().onAuthStateChanged( userInfo => {
  if( userInfo ){
    document.querySelector( '.bIniciar' ).classList.add( 'oculto' )
    document.querySelector( '.bCerrar.oculto' ) && document.querySelector( '.bCerrar.oculto' ).classList.remove( 'oculto' )
    document.querySelector( '.avatar' ).style.backgroundImage = `url( ${userInfo.photoURL} )`
    document.querySelector( '.info' ).innerHTML = `
      <p>${userInfo.displayName}</p>
      <p>${userInfo.email}</p>
    `
  } else {
    document.querySelector( '.avatar' ).style.backgroundImage = null
    document.querySelector( '.info' ).innerHTML = ''
    document.querySelector( '.bCerrar' ).classList.add( 'oculto' )
    document.querySelector( '.bIniciar.oculto' ) && document.querySelector( '.bIniciar.oculto' ).classList.remove( 'oculto' )
  }
})

function loading( sw ){
  const $bI = document.querySelector('.bIniciar')
  $bI.style.pointerEvents = sw ? 'none' : null
  $bI.textContent = sw ? 'Conectando ...' : 'Iniciar sesión'
}
