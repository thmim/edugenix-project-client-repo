import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { auth } from '../../firebase/firebase.init';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { onAuthStateChanged } from 'firebase/auth';
import { GoogleAuthProvider } from 'firebase/auth';
const provider = new GoogleAuthProvider();
const AuthProvider = ({children}) => {
    const [user,setUser] = useState(null);
    const [loading,setLoading] = useState(true);
    const createUser = (email,password) =>{
        setLoading(true);
        return createUserWithEmailAndPassword(auth,email,password);
    }
    const signInUser = (email,password) =>{
        setLoading(true);
        return signInWithEmailAndPassword(auth,email,password)
    }

    const socialLogin = () =>{
        setLoading(true);
        return signInWithPopup(auth,provider);
    }

    const updateUserProfile = profileInfo =>{
        return updateProfile(auth.currentUser,profileInfo)
    }

    const logout = () =>{
        setLoading(true);
        return signOut(auth);
    }

        useEffect(()=>{
        const unSubscribe = onAuthStateChanged(auth,currentUser=>{
              setUser(currentUser);
              setLoading(false);
        });
        return () => {
            unSubscribe();
        }
    },[])

    const authInfo = {
        user,
        loading,
        createUser,
        signInUser,
        socialLogin,
        updateUserProfile,
        logout,
    }
    return (
        <AuthContext value={authInfo}>
            {children}
        </AuthContext>
    );
};

export default AuthProvider;