
'use client';

import { createContext, useContext, ReactNode, useMemo } from 'react';
import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getAuth, Auth } from 'firebase/auth';

interface FirebaseContextValue {
  app: FirebaseApp;
  db: Firestore;
  auth: Auth;
}

const FirebaseContext = createContext<FirebaseContextValue | null>(null);

export function FirebaseProvider({ children }: { children: ReactNode }) {
    // useMemo ensures that Firebase is initialized only once and on the client-side.
    const firebaseValue = useMemo(() => {
        const firebaseConfig = JSON.parse(process.env.NEXT_PUBLIC_FIREBASE_WEBAPP_CONFIG!);
        const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
        const db = getFirestore(app);
        const auth = getAuth(app);
        return { app, db, auth };
    }, []);

    return (
        <FirebaseContext.Provider value={firebaseValue}>
            {children}
        </FirebaseContext.Provider>
    );
}

export const useFirebase = (): FirebaseContextValue => {
    const context = useContext(FirebaseContext);
    if (!context) {
        throw new Error('useFirebase must be used within a FirebaseProvider');
    }
    return context;
};
