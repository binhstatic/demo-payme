// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getToken, getMessaging, onMessage } from 'firebase/messaging';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDTK13Z8hbRn2mDKcxAC53tfV2cy1f_y3Y',
  authDomain: 'push-app-4e3e5.firebaseapp.com',
  projectId: 'push-app-4e3e5',
  storageBucket: 'push-app-4e3e5.appspot.com',
  messagingSenderId: '1068031560223',
  appId: '1:1068031560223:web:ff4c42eb43dc658bf5632a',
};

console.log('*** Environment ***');
console.log('*** Firebase Config ***', firebaseConfig);

const firebaseApp = initializeApp(firebaseConfig);
const messaging = getMessaging(firebaseApp);

export const getOrRegisterServiceWorker = () => {
  if ('serviceWorker' in navigator) {
    return window.navigator.serviceWorker
      .getRegistration('/firebase-push-notification-scope')
      .then((serviceWorker) => {
        if (serviceWorker) return serviceWorker;
        return window.navigator.serviceWorker.register(
          '/firebase-messaging-sw.js',
          {
            scope: '/firebase-push-notification-scope',
          }
        );
      });
  }
  throw new Error('The browser doesn`t support service worker.');
};

export const getFirebaseToken = () =>
  getOrRegisterServiceWorker().then((serviceWorkerRegistration) =>
    getToken(messaging, {
      vapidKey:
        'BNWnYB4Tu_JmsfIpAZ9sONsPV0N6dv9iytkA7ttkfWVM0Wy_m9SRHdvb6RUFbEaEHvEYcLa9_ZVfo6xMf_eiuDM',
      serviceWorkerRegistration,
    })
  );

export const onForegroundMessage = () =>
  new Promise((resolve) => onMessage(messaging, (payload) => resolve(payload)));
