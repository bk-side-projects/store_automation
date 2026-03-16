
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { useFirebase } from '@/lib/firebase/client-provider'; // Import the new, correct hook
import styles from '@/app/login/Login.module.css';

export default function SignUp() {
  const { auth, db } = useFirebase(); // Use the new hook to get auth and db
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Create a user document in Firestore
      await setDoc(doc(db, 'users', user.uid), {
        email: user.email,
        role: 'user', // Assign a default role
      });

      router.push('/');
    } catch (err: any) {
        console.error("Sign Up Error:", err);
        if (err.code === 'auth/email-already-in-use') {
            setError('이미 사용 중인 이메일입니다.');
        } else if (err.code === 'auth/weak-password') {
            setError('비밀번호는 6자리 이상이어야 합니다.');
        } else {
            setError('회원가입에 실패했습니다. 잠시 후 다시 시도해주세요.');
        }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.loginBox}>
        <h1 className={styles.title}>Create Account</h1>
        <form onSubmit={handleSignUp} className={styles.form}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            className={styles.input}
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            className={styles.input}
          />
          {error && <p className={styles.error}>{error}</p>}
          <button type="submit" className={styles.button}>
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}
