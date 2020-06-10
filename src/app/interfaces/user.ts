import { firestore } from 'firebase';

export interface User {
  id: string;
  name: string;
  avatorURL: string;
  createdAt: firestore.Timestamp;
}

export interface UserWithTagsAndBio extends User {
  tags: string[];
  bio: string;
}
