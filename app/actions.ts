
'use server'

import { admin } from '@/lib/firebase/admin';

export async function getEmailByUserId(userId: string): Promise<string | null> {
  try {
    const db = admin.firestore();
    const usersRef = db.collection('users');
    const snapshot = await usersRef.where('userId', '==', userId).limit(1).get();

    if (snapshot.empty) {
      return null;
    }

    const userDoc = snapshot.docs[0];
    return userDoc.data().email;
  } catch (error) {
    console.error("Error fetching email by user ID:", error);
    return null;
  }
}

export async function signUpWithEmailAndPassword(email: string, password: string, userId: string): Promise<{error?: string}> {
    try {
        const auth = admin.auth();
        const firestore = admin.firestore();

        const userRecord = await auth.createUser({
            email: email,
            password: password,
        });

        await firestore.collection('users').doc(userRecord.uid).set({
            userId: userId,
            email: email,
        });

        return {};

    } catch (error: any) {
        console.error('Sign up error:', error);
        return { error: error.message };
    }
}
