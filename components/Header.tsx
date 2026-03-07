import React from 'react';
import Link from 'next/link';
import styles from './Header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href="/">통영아재수산</Link>
      </div>
      {/* 향후 사용자 정보 및 로그아웃 버튼 등이 여기에 위치합니다. */}
    </header>
  );
}
