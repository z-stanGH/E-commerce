import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { ref, set, update } from 'firebase/database';
import toast from 'react-hot-toast';

//import { updateUserIsLogged } from './users.services';
import { auth, db } from '../Config/firebase-config';

export const verifyUser = async (user) => {
  try {
    await sendEmailVerification(user);
    toast.success('Verification email sent!');
  } catch (error) {
    toast.error('Something went wrong. Please, try again.');
  }
};

export const updateUserIsLogged = async (uid, isLogged) => {
  return update(ref(db), {
    [`users/${uid}/isLogged`]: isLogged,
  });
};

export const registerUser = async (firstName, lastName, email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    // Signed up
    const user = userCredential.user;
    // Register user in database
    set(ref(db, `users/${user?.uid}`), {
      uid: user?.uid,
      firstName,
      lastName,
      email,
      createdOn: Date.now(),
    });
    await verifyUser(user);
    return { user: user?.uid };
  } catch (error) {
    if (error instanceof Error) {
      const errorMessage = error?.message;
      let errMsg = '';
      if (
        errorMessage.includes('email-already-in-use') ||
        errorMessage.includes('EMAIL_EXISTS')
      ) {
        errMsg = 'Email is already taken! Please, choose another one!';
      } else {
        errMsg = 'Something went wrong. Please, try again.';
      }
      return { error: errMsg };
    }
  }
};

export const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    // Signed in
    const user = userCredential.user;
    await updateUserIsLogged(user?.uid, true);
    return { user: user?.uid };
  } catch (error) {
    console.error('Login error:', error);
    const authError = error;
    const errorMessage = authError.code;
    let errMsg = '';
    if (errorMessage === 'auth/invalid-login-credentials') {
      errMsg = 'Please check your credentials.';
    } else {
      errMsg = 'Something went wrong. Please, try again.';
    }
    return { error: errMsg };
  }
};

export const logoutUser = async () => {
  try {
    localStorage.removeItem('email');
    await updateUserIsLogged(auth.currentUser?.uid, false);

    await signOut(auth);

    toast.success('Logout successful!');
    return true;
  } catch (error) {
    toast.error('Something went wrong. Please, try again.');
    return false;
  }
};
