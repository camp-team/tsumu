import { firestore } from 'firebase';

export interface Note {
  id: string;
  todo: string;
  done: string;
  log: string;
  authorId: string;
  createdAt: firestore.Timestamp;
}
