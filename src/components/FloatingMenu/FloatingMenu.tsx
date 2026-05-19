import Link from "next/link";
import styles from "./FloatingMenu.module.css";
import authService from "@/services/auth.service";
import SignoutButton from "./SignoutButton";

export default async function FloatingMenu() {
  const auth = await authService.getAuth();
  if (!auth) return null;

  return (
    <div
      className={`fixed top-0 left-0 bg-gray-800 flex flex-col items-center gap-2 px-4 rounded-br-md py-2 text-sm ${styles.floatingMenu}`}
    >
      <Link href="/books" className={styles.menuItem}>
        Books
      </Link>
      {auth.role === "admin" && (
        <Link href="/users" className={styles.menuItem}>
          Users
        </Link>
      )}
      <Link href={`/users/${auth.id}`} className={styles.menuItem}>
        Profile
      </Link>
      <SignoutButton />
      <div className={styles.icon}>M</div>
    </div>
  );
}
