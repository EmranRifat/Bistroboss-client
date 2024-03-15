import { createContext, useEffect, useState } from "react";
import {GoogleAuthProvider,createUserWithEmailAndPassword,getAuth,onAuthStateChanged,sendEmailVerification,sendPasswordResetEmail,signInWithEmailAndPassword,signInWithPopup,signOut,updateProfile,} from "firebase/auth";
import { app } from "../firebase/firebase.confiq" ;

export const AuthContext = createContext(null);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
// eslint-disable-next-line react/prop-types
const AuthProvider = ({ children }) => {
  
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);



  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };


  // 4. Google Signin
  const signInWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  //   2. Update Name
  const updateUserProfile = (name, photo) => {
    setLoading(true);
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };

  //   3. Email Verify
  const verifyEmail = () => {
    setLoading(true);
    return sendEmailVerification(auth.currentUser);
  };

  //6. Login with Password
  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // 5. Logout
  const logOut = () => {
    setLoading(true);
    // localStorage.removeItem("ACCESS_TOKEN_SECRET");
    return signOut(auth);
  };
  //7. Forget Password
  const resetPassword = (email) => {
    setLoading(true);
    return sendPasswordResetEmail(auth, email);
  };

  useEffect(() => {
    //this part will execute once the component is mounted.
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      // console.log("current user" ,currentUser);
      setUser(currentUser);
      // console.log("current-user",currentUser)
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const authInfo = {
    user,
    loading,
    setLoading,
    createUser,
    signInWithGoogle,
    signIn,
    logOut,
    verifyEmail,
    updateUserProfile,
    resetPassword,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
