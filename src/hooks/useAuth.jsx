import React, { use } from 'react';
import { AuthContext } from '../context/authcontext/AuthContext';

const useAuth = () => {
    const authInfo = use(AuthContext)
    return authInfo;
};

export default useAuth;