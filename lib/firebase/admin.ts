
import admin from 'firebase-admin';

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.applicationDefault(),
  });
}

const db = admin.firestore();

const masterUserId = 'master'; // Master account ID
const masterEmail = 'master@tongyeong-susan.com'; // Internal email for Firebase Auth

/**
 * Initializes the master administrator user.
 * Checks if a user with userId 'master' exists in the 'users' collection.
 * If not, it creates a new user in Firebase Authentication and a corresponding
 * document in the 'users' collection in Firestore with the 'master' role.
 */
const initializeMasterUser = async () => {
  const usersRef = db.collection('users');
  const userQuery = await usersRef.where('userId', '==', masterUserId).get();

  if (userQuery.empty) {
    console.log(`Master user '${masterUserId}' not found in Firestore. Attempting to create...`);
    try {
      // 1. Create user in Firebase Auth
      const userRecord = await admin.auth().createUser({
        email: masterEmail,
        password: 'password', // Default password, should be changed
        displayName: 'Master Admin',
      });

      // 2. Set custom claim for master role
      await admin.auth().setCustomUserClaims(userRecord.uid, { role: 'master' });

      // 3. Create user document in Firestore
      await usersRef.doc(userRecord.uid).set({
        userId: masterUserId,
        email: masterEmail,
        name: 'Master Admin',
        role: 'master',
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      });

      console.log(`Master user '${masterUserId}' created successfully in Auth and Firestore.`);

    } catch (error: any) {
      // This case handles if the auth user exists but the firestore doc doesn't.
      if (error.code === 'auth/email-already-exists') {
        console.log(`User with email '${masterEmail}' already exists in Auth. Verifying Firestore document and claims...`);
        const userRecord = await admin.auth().getUserByEmail(masterEmail);

        // Ensure role is set in claims
        await admin.auth().setCustomUserClaims(userRecord.uid, { role: 'master' });

        // Check and create user document in Firestore if it's missing
        const userDocRef = usersRef.doc(userRecord.uid);
        const userDoc = await userDocRef.get();
        if (!userDoc.exists) {
            await userDocRef.set({
                userId: masterUserId,
                email: masterEmail,
                name: 'Master Admin',
                role: 'master',
                createdAt: admin.firestore.FieldValue.serverTimestamp(),
            });
            console.log(`Firestore document for '${masterUserId}' created.`);
        }
         console.log(`Master user '${masterUserId}' configuration verified.`);
      } else {
        console.error('Error initializing master user:', error);
      }
    }
  } else {
    console.log(`Master user '${masterUserId}' already exists.`);
  }
};

initializeMasterUser().catch(console.error);

export { admin, db };
