import Link from 'next/link';
import styles from './Header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <ul className={styles.navList}>
          <li><Link href="/" className={styles.navLink}>Home</Link></li>
          <li><Link href="/products" className={styles.navLink}>Products</Link></li>
          <li><Link href="/support" className={styles.navLink}>Support</Link></li>
          <li><Link href="/login" className={styles.navLink}>Login</Link></li>
        </ul>
      </nav>
    </header>
  );
}
