import * as functions from 'firebase-functions';
import { Algolia } from './utils/algolia';
import * as admin from 'firebase-admin';
import { db, deleteCollectionByReference } from './utils/util';

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
  .https.onCall((uid, _) => {
    return admin.auth().deleteUser(uid);
  })

// Firestoreのuserデータを削除
export const deleteUserData = functions
  .region('asia-northeast1')
  .auth.user()
  .onDelete(async (user, _) => {
    const uid = user.uid;
    await db.doc(`users/${uid}`).delete();
    const myNotesRef = db.collection(`notes`).where('authorId', '==', uid)
    await deleteCollectionByReference(myNotesRef);
    return;
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
