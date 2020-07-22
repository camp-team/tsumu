import * as admin from 'firebase-admin';

export const db = admin.firestore();

export function deleteCollectionByReference(
  ref:
    | FirebaseFirestore.Query<FirebaseFirestore.DocumentData>
    | FirebaseFirestore.CollectionReference<FirebaseFirestore.DocumentData>,
  batchSize: number = 450
): Promise<void> {
  const query = ref.limit(batchSize);
  return new Promise((resolve, reject) =>
    deleteQueryBatch(query, batchSize, resolve, reject)
  );
}

function deleteQueryBatch(
  query: FirebaseFirestore.Query<FirebaseFirestore.DocumentData>,
  batchSize: number,
  resolve: any,
  reject: any
) {
  const deletedData: string[] = [];
  query
    .get()
    .then((snapshot) => {
      if (snapshot.size === 0) {
        return 0;
      }

      const batch = db.batch();
      snapshot.docs.forEach((doc) => batch.delete(doc.ref));
      deletedData.push(snapshot.docs.toString());

      return batch.commit().then(() => snapshot.size);
    })
    .then((numDeleted) => {
      if (numDeleted === 0) {
        resolve();
        console.log(deletedData, 'Resolved!');
        return;
      }
      process.nextTick(() =>
        deleteQueryBatch(query, batchSize, resolve, reject)
      );
    })
    .catch(reject)
}
