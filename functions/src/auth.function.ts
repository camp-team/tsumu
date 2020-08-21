import * as functions from 'firebase-functions';
import { db } from './utils/util';

export const createAdminUser = functions
  .region('asia-northeast1')
  .auth.user()
  .onCreate((afUser) => {
    return db.doc(`users/${afUser.uid}`).set({
      id: afUser.uid,
      name: afUser.displayName,
      avatorURL: afUser.photoURL,
      createdAt: new Date(),
    });
  });

export const deleteAdminUser = functions
  .region('asia-northeast1')
  .auth.user()
  .onDelete((afUser) => {
    return db.doc(`users/${afUser.uid}`).delete();
  });
