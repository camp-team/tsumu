import { firestore } from 'firebase';
import { User } from './user';

export interface Note {
  id: string;
  todo: string;
  done: string;
  log: string;
  authorId: string;
  createdAt: firestore.Timestamp;
}

export interface NoteWithUser extends Note {
  author: User;
}
