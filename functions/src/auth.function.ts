import * as admin from 'firebase-admin';

export const createUser = functions.auth.user().onCreate();
