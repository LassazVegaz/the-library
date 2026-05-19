import Link from "next/link";
import styles from "./FloatingMenu.module.css";

export default function FloatingMenu() {
  return (
    <div
      className={`fixed top-0 left-0 bg-gray-800 flex flex-col items-center gap-2 px-4 rounded-br-md py-2 text-sm ${styles.floatingMenu}`}
    >
      <Link href="/books" className={styles.menuItem}>
        Books
      </Link>
      <Link href="/users" className={styles.menuItem}>
        Users
      </Link>
      <Link href="/user/0" className={styles.menuItem}>
        Profile
      </Link>
      <div className={styles.menuItem}>Sign out</div>
      <div className={styles.icon}>M</div>
    </div>
  );
}
