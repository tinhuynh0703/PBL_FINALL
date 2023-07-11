/* eslint-disable no-undef */

importScripts('https://www.gstatic.com/firebasejs/8.9.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.9.0/firebase-analytics.js');
importScripts('https://www.gstatic.com/firebasejs/8.9.0/firebase-messaging.js');

const firebaseConfig = {
  apiKey: 'AIzaSyCrtNWy-vBMARmFHQU57WeqeTFQsInB3Vg',
  authDomain: 'test-notification-coffee-app.firebaseapp.com',
  databaseURL: 'https://test-notification-coffee-app-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'test-notification-coffee-app',
  storageBucket: 'test-notification-coffee-app.appspot.com',
  messagingSenderId: '180423453297',
  appId: '1:180423453297:web:f1f70e65394de09bbb49d0',
  measurementId: 'G-V07GNPW3NJ',
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  const notificationTitle = payload.data.title;
  const notificationOptions = {
    body: payload.data.body,
    icon: './images/OTSVLogo.png',
  };

  // eslint-disable-next-line no-restricted-globals
  return self.registration.showNotification(notificationTitle, notificationOptions);
});

// eslint-disable-next-line no-restricted-globals
self.addEventListener('notificationclick', function (event) {
  event.notification.close();
  event.waitUntil(clients.openWindow('/'));
});

// FIXME: Notification click can improve UX by below code
// if the user is already open the coffe app tab then focuses tab
// if not , open a new coffe app tab tab
// event.waitUntil(clients.matchAll({
//   type: "window"
// }).then(function(clientList) {
//   for (var i = 0; i < clientList.length; i++) {
//     var client = clientList[i];
//     if (client.url == '/' && 'focus' in client)
//       return client.focus();
//   }
//   if (clients.openWindow)
//     return clients.openWindow('/');
// }));
// https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerGlobalScope/notificationclick_event
