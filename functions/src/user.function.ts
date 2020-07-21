import * as functions from 'firebase-functions';
import { Algolia } from './utils/algolia';
import * as admin from 'firebase-admin';
import { db } from './utils/util';

const algolia = new Algolia();


export const createUser = functions
  .region('asia-northeast1')
  .firestore.document('users/{id}')
  .onCreate((snap) => {
    const data = snap.data();
    return algolia.saveRecord({
      indexName: 'users',
      largeConcentKey: 'body',
      data
    });
  });

// Algoriaのuserデータの削除
export const deleteUser = functions
  .region('asia-northeast1')
  .firestore.document('users/{id}')
  .onDelete(snap => {
    const data = snap.data();
    if (data) {
      algolia.removeRecord('users', data.id);
    } else {
      return;
    }
  });

// FirebaseのAuthenticationのuserデータを削除
export const removeAdminUser = functions
  .region('asia-northeast1')
  .https.onCall((data, _) => {
    return admin.auth().deleteUser(data);
  })

// Firestoreのuserデータを削除
export const deleteUserData = functions
  .region('asia-northeast1')
  .auth.user()
  .onDelete(user => {
    return db.doc(`users/${user.uid}`).delete();
  })

export const updateUser = functions
  .region('asia-northeast1')
  .firestore.document('users/{id}')
  .onUpdate(change => {
    const data = change.after.data();
    return algolia.saveRecord({
      indexName: 'users',
      largeConcentKey: 'body',
      isUpdate: true,
      data
    });
  });
