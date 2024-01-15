import { get, ref } from 'firebase/database';
import { db } from '../Config/firebase-config';

export const getAllProducts = async () => {
  return get(ref(db, 'products')).then((snapshot) => {
    if (!snapshot.exists()) {
      return [];
    }
    return Object.values(snapshot.val());
  });
};
