import * as functions from 'firebase-functions';
import { Algolia } from './utils/algolia';
import { db } from './utils/util';

const algolia = new Algolia();

export const createNote = functions
  .region('asia-northeast1')
  .firestore.document('notes/{id}')
  .onCreate(snap => {
    const data = snap.data();
    return algolia.saveRecord({
      indexName: 'notes',
      largeConcentKey: 'body',
      data
    })
  })

export const deleteNote = functions
  .region('asia-northeast1')
  .firestore.document('notes/{id}')
  .onDelete(snap => {
    const data = snap.data();
    if (data) {
      algolia.removeRecord('notes', data.id);
    } else {
      return;
    }
  });
