import { initializeApp } from "firebase/app";

import toast from "react-hot-toast";
// import store from "../store";
import { login as loginHandle, logout as logoutHandle } from "../store/auth";
import { getStorage } from "firebase/storage";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
//   updateProfile,
//   sendEmailVerification,
//   updatePassword,
} from "firebase/auth";
import store from "../store";
import {
  getFirestore,
  collection,
  addDoc,
  onSnapshot,
  doc,
  query,
  where,
  deleteDoc,
  serverTimestamp,
  // orderBy,
  updateDoc,
} from "firebase/firestore";
import { setIlanlar } from "../store/ilanlar";


const firebaseConfig = {
  apiKey: "AIzaSyDwh2lkF7Ok4YIAzw6Dy7LNl8iSlizJuzg",
  authDomain: "emlak-sitesi-58dcf.firebaseapp.com",
  projectId: "emlak-sitesi-58dcf",
  storageBucket: "emlak-sitesi-58dcf.appspot.com",
  messagingSenderId: "1074912504932",
  appId: "1:1074912504932:web:8a66a150c540996e0a4371",
  measurementId: "G-J13XL4HV50"
};

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth();
//----------------------------------Firestore----------------------------------
export const db = getFirestore(app);
//----------------------------------Firestore----------------------------------
//----------------------------------Storage----------------------------------
export const storage = getStorage(app);
//----------------------------------Storage----------------------------------

//----------------------------------auth----------------------------------
export const register = async (email, password) => {
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      return user;
    } catch (error) {
      toast.error(error.message);
    }
  };
  
  export const login = async (email, password) => {
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      return user;
    } catch (error) {
      toast.error(error.message);
    }
  };

  export const logout = async () => {
    try {
      await signOut(auth);
      return true;
    } catch (error) {
      toast.error(error.message);
    }
  };
//----------------------------------auth----------------------------------
  
//----------------------------------Read----------------------------------
onAuthStateChanged(auth, (user) => {
  if (user) {
    store.dispatch(
      loginHandle({
        displayName: user.displayName,
        email: user.email,
        emailVerified: user.emailVerified,
        photoURL: user.photoURL,
        uid: user.uid,
      })
    );
    // READ Ilan
    onSnapshot(query(collection(db, "ilanlar"),where("uid","==",auth.currentUser.uid)), (doc) => {
      store.dispatch(
        setIlanlar(
          doc.docs.reduce(
            (ilanlar, ilan) => [...ilanlar, { ...ilan.data(), id: ilan.id }],
            []
          )
        )
      );
    });

  } else {
    store.dispatch(logoutHandle());

    // READ Ilan
    onSnapshot(query(collection(db, "ilanlar")), (doc) => {
      store.dispatch(
        setIlanlar(
          doc.docs.reduce(
            (ilanlar, ilan) => [...ilanlar, { ...ilan.data(), id: ilan.id }],
            []
          )
        )
      );
    });
  }
});
//----------------------------------Read----------------------------------

//----------------------------------Firestore----------------------------------
//?---------------------------------İlanlar---------------------------------
export const addIlan = async (data) => {
  data.createdAt = serverTimestamp();
  try {
    const result = await addDoc(collection(db, "ilanlar"), data);
    toast.success("İlan Başarıyla Eklendi");
    return result.id;
  } catch (error) {
    toast.error(error.message);
  }
};
export const deleteIlan = async (id) => {
  try {
    await deleteDoc(doc(db, "ilanlar", id))
  } catch (error) {
    toast.error(error.message);
  }
}
//admin
export const updateIlan = async (id,data)=>{
  try {
    const ilanRef = doc(db, "ilanlar", id);
    await updateDoc(ilanRef,data)
    toast.success("Ilan Başarıyla Güncellendi")
    return true
  } catch (error) {
    toast.error(error.message);
  }
}
//frontend
export const updateIlanFd = async (id,data)=>{
  try {
    const ilanRef = doc(db, "ilanlar", id);
    await updateDoc(ilanRef,data)
    return true
  } catch (error) {
    console.error(error)
  }
}
//?---------------------------------İlanlar---------------------------------

//----------------------------------Firestore----------------------------------