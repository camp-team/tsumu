import * as functions from 'firebase-functions';
import { Algolia } from './utils/algolia';

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

export const deleteAdminUser = functions
  .region('asia-northeast1')
  .https.onCall((data, context) => {
    return functions.auth.user().onDelete();
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
