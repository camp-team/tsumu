import { firestore } from 'firebase';
import { Subscription } from 'rxjs';

export interface Note {
  id: string;
  authorId: string;
  createdAt: firestore.Timestamp;
}
