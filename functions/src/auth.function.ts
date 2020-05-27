import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

export const db = admin.firestore();

admin.initializeApp(functions.config().firebase);

export const createUser = functions.auth.user().onCreate((afUser) => {
  return db.doc(`users/${afUser.uid}`).set({
    name: afUser.displayName,
    avatorURL: afUser.photoURL,
    createdAt: new Date(),
  });
});
