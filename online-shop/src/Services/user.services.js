import { get, ref } from 'firebase/database';
import toast from 'react-hot-toast';
import { db } from '../Config/firebase-config';

export const getUserByID = async (uid) => {
  return get(ref(db, `users/${uid}`))
    .then((snapshot) => {
      if (!snapshot.exists()) {
        return null;
      }

      return snapshot.val();
    })
    .catch((error) => {
      toast.error(error.message);
    });
};
