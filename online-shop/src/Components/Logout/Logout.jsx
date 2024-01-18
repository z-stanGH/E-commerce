import React, { useEffect } from 'react';
import SignUp from '../Signup/Signup';
import { logoutUser } from '../../Services/auth.services';

const Logout = () => {
  useEffect(() => {
    async function logOut() {
      await logoutUser();
    }
    logOut();
    console.log('user is logged out successful');
  });
  return <SignUp />;
};

export default Logout;
