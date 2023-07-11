import firebase from 'firebase/app';
import '@firebase/messaging';
import { MessagingPayload } from 'firebase-admin/lib/messaging/messaging-api';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

firebase.initializeApp(firebaseConfig);
export default firebase;

export const getDeviceToken = async () => {
  const message = firebase.messaging();
  let deviceToken = '';

  try {
    deviceToken = await message.getToken({ vapidKey: process.env.KEY_PAIR });
    return deviceToken;
  } catch (error) {
    /* If the user refuses to receive the notification,
     * firebase version 8 getToken() function will throw an error and
     * i won't do anything about it because it's the user's choice
     */
    // eslint-disable-next-line no-console
    console.error('If you refuse to receive notifications, you will not receive the status of your order');
  }
};

export const onMessageListener = (): Promise<MessagingPayload> =>
  new Promise((resolve, reject) => {
    const message = firebase.messaging();
    message.onMessage((payload: MessagingPayload) => {
      if (!payload) {
        reject(new Error('There is no payload'));
      }
      resolve(payload);
    });
  });
