importScripts(
  'https://www.gstatic.com/firebasejs/9.10.0/firebase-app-compat.js'
);
importScripts(
  'https://www.gstatic.com/firebasejs/9.10.0/firebase-messaging-compat.js'
);

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
  apiKey: 'AIzaSyDTK13Z8hbRn2mDKcxAC53tfV2cy1f_y3Y',
  authDomain: 'push-app-4e3e5.firebaseapp.com',
  projectId: 'push-app-4e3e5',
  storageBucket: 'push-app-4e3e5.appspot.com',
  messagingSenderId: '1068031560223',
  appId: '1:1068031560223:web:ff4c42eb43dc658bf5632a',
};

// eslint-disable-next-line no-undef
firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
// eslint-disable-next-line no-undef
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('Received background message: ', payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = { body: payload.notification.body };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
