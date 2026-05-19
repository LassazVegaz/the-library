"use client";
import { signoutAction } from "./actions";
import styles from "./FloatingMenu.module.css";

export default function SignoutButton() {
  return (
    <button className={styles.menuItem} onClick={signoutAction}>
      Sign out
    </button>
  );
}
