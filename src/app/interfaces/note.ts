import { firestore } from 'firebase';

export interface Note {
  id: string;
  text: string;
  authorId: string;
  createdAt: firestore.Timestamp;
}
