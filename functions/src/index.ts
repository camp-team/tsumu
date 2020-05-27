import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

export const db = admin.firestore();

admin.initializeApp(functions.config().firebase);

export { createUser } from './auth.function';
