import * as functions from 'firebase-functions';
import { db } from './utils/util';

export const createAdminUser = functions.auth.user().onCreate((afUser) => {
  return db.doc(`users/${afUser.uid}`).set({
    id: afUser.uid,
    name: afUser.displayName,
    avatorURL: afUser.photoURL,
    createdAt: new Date(),
  });
});

export const deleteAdminUser = functions.auth.user().onDelete((afUser) => {
  return db.doc(`users/${afUser.uid}`).delete();
});
