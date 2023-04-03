// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCrxiK-8TxIM9zbLoOXeNsejBGOoKZN68Y',
  authDomain: 'notification-5d864.firebaseapp.com',
  projectId: 'notification-5d864',
  storageBucket: 'notification-5d864.appspot.com',
  messagingSenderId: '857899555595',
  appId: '1:857899555595:web:fd57b87c8bb5dbe009200e',
  measurementId: 'G-KB22QENM9G',
};

const firebaseApp = initializeApp(firebaseConfig);
const messaging = getMessaging(firebaseApp);

export const fetchToken = (setTokenFound: any) => {
  return getToken(messaging, {
    vapidKey: `BK9pG1PjeSIhYxjG8pWtbqrnZI9k2qy0VGpxch6etLlZPelCrcGu4dlTl0eJuGkh5799gmRZLawdPX-wFdopWW8`,
  })
    .then((currentToken) => {
      if (currentToken) {
        console.log('current token for client: ', currentToken);
        setTokenFound(true);
        // Track the token -> client mapping, by sending to backend server
        // show on the UI that permission is secured
      } else {
        console.log(
          'No registration token available. Request permission to generate one.'
        );
        setTokenFound(false);
        // shows on the UI that permission is required
      }
    })
    .catch((err) => {
      console.log('An error occurred while retrieving token. ', err);
    });
};

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });
