import { User } from './user';
import { Note } from './note';

export interface UserWithNotes {
  user: User;
  notes: Note[];
}
