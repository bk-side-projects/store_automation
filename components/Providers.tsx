'use client';

import { createContext, useState, useEffect, ReactNode, useContext } from 'react';
import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getAuth, onAuthStateChanged, signOut, signInWithEmailAndPassword, createUserWithEmailAndPassword, User, IdTokenResult } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc, collection, query, where, getDocs, limit } from 'firebase/firestore';
import { useRouter } from 'next/navigation';

// --- Firebase Initialization ---
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

export const app: FirebaseApp = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);

// --- Types and Context ---
type AuthStatus = 'loading' | 'authenticated' | 'unauthenticated';

interface UserProfile {
  userId: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  userProfile: UserProfile | null;
  authStatus: AuthStatus;
  idTokenResult: IdTokenResult | null;
  login: (id: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  signup: (id: string, email: string, password: string) => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// --- Provider Component ---
export default function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [authStatus, setAuthStatus] = useState<AuthStatus>('loading');
  const [idTokenResult, setIdTokenResult] = useState<IdTokenResult | null>(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      if (user) {
        const tokenResult = await user.getIdTokenResult();
        setIdTokenResult(tokenResult);
        
        const userDocRef = doc(db, 'users', user.uid);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          setUserProfile(userDocSnap.data() as UserProfile);
          setAuthStatus('authenticated');
        } else {
          setUserProfile(null);
          setAuthStatus('unauthenticated');
        }
      } else {
        setUserProfile(null);
        setIdTokenResult(null);
        setAuthStatus('unauthenticated');
      }
    });
    return () => unsubscribe();
  }, []);

  const login = async (id: string, password: string) => {
    const usersRef = collection(db, 'users');
    const q = query(usersRef, where('userId', '==', id), limit(1));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      throw new Error('존재하지 않는 아이디입니다.');
    }
    const userDoc = querySnapshot.docs[0];
    const email = userDoc.data().email;
    if (!email) {
      throw new Error('사용자 이메일을 찾을 수 없습니다.');
    }
    await signInWithEmailAndPassword(auth, email, password);
    // onAuthStateChanged will handle the rest.
  };

  const logout = async () => {
    await signOut(auth);
    // onAuthStateChanged will set status to 'unauthenticated'
    // and AppLayout will redirect to /login.
  };

  const signup = async (id: string, email: string, password: string) => {
    const usersRef = collection(db, 'users');
    const q = query(usersRef, where('userId', '==', id), limit(1));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      throw new Error('이미 존재하는 아이디입니다.');
    }

    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const newUser = userCredential.user;

    await setDoc(doc(db, 'users', newUser.uid), {
      userId: id,
      email: email,
    });
    // onAuthStateChanged will handle the rest.
  };

  const value = { user, userProfile, authStatus, idTokenResult, login, logout, signup };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// --- Custom Hook ---
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
