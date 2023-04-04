// Scripts for firebase and firebase messaging
// eslint-disable-next-line no-undef
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js');
// eslint-disable-next-line no-undef
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
  apiKey: 'AIzaSyCrxiK-8TxIM9zbLoOXeNsejBGOoKZN68Y',
  authDomain: 'notification-5d864.firebaseapp.com',
  projectId: 'notification-5d864',
  storageBucket: 'notification-5d864.appspot.com',
  messagingSenderId: '857899555595',
  appId: '1:857899555595:web:fd57b87c8bb5dbe009200e',
  measurementId: 'G-KB22QENM9G',
};

// eslint-disable-next-line no-undef
firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
// eslint-disable-next-line no-undef
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log('Received background message ', payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/logo192.png',
  };

  // eslint-disable-next-line no-restricted-globals
  return self.registration.showNotification(
    notificationTitle,
    notificationOptions
  );
});
