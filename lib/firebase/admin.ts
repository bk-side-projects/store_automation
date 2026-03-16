
import admin from 'firebase-admin';

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.applicationDefault(),
  });
}

const db = admin.firestore();

const initializeMasterRole = async () => {
  const masterRoleRef = db.collection('roles').doc('master');
  const masterRoleDoc = await masterRoleRef.get();

  if (!masterRoleDoc.exists) {
    await masterRoleRef.set({
      name: 'master',
      permissions: {
        '/orders': 'write',
        '/inventory': 'write',
        '/packing': 'write',
        '/shipping': 'write',
        '/users': 'write',
        '/roles': 'write',
      },
    });
    console.log('Master role created successfully.');
  } else {
    console.log('Master role already exists.');
  }
};

initializeMasterRole().catch(console.error);

export { admin, db };
