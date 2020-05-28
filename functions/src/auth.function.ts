import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

export const db = admin.firestore();

export const createUser = functions.auth.user().onCreate((afUser) => {
  return db.doc(`users/${afUser.uid}`).set({
    id: afUser.uid,
    name: afUser.displayName,
    avatorURL: afUser.photoURL,
    createdAt: new Date(),
  });
});

export const deleteUser = functions.auth.user().onDelete((afUser) => {
  return db.doc(`users/${afUser.uid}`).delete();
});
