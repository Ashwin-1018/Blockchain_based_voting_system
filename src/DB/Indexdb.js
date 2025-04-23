// src/db/indexdb.js
import { openDB } from 'idb';

const DB_NAME = 'voting-app';
const STORE_NAME = 'votes';

const dbPromise = openDB(DB_NAME, 1, {
  upgrade(db) {
    if (!db.objectStoreNames.contains(STORE_NAME)) {
      db.createObjectStore(STORE_NAME, { keyPath: 'id' });
    }
  },
});

export async function saveVote(vote) {
  const db = await dbPromise;
  await db.put(STORE_NAME, vote);
}

export async function getVotes() {
  const db = await dbPromise;
  return db.getAll(STORE_NAME);
}
