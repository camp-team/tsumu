import { firestore } from 'firebase';

export interface User {
  id: string;
  name: string;
  avatorURL: string;
  createdAt: firestore.Timestamp;
}
