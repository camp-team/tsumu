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

export const deleteNoteData = functions
  .region('asia-northeast1')
  .https.onCall((data, _) => {
    const notes: Observable<Note[]> = db.collection<Note>(`notes`, ref =>
      ref.where('authorId', '==', data))
      .valueChanges();
    notes.subscribe(items =>
      Promise.all(
        items.map(item => {
          return db.doc(`notes/${item.id}`).delete();
        })
      )
    );
  })
