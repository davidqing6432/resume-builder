import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import LogoutButton from "./LogoutButton/LogoutButton";
import styles from "./NavBar.module.css";

export default async function NavBar() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return (
    <nav className={styles.nav}>
      <ul className={styles.items}>
        <li className={styles.listItem}>
          <Link href="/">Home</Link>
        </li>
        {user ? (
          <>
            <li className={styles.listItem}>
              <Link href="/experiences">Experiences</Link>
            </li>
            <li className={styles.listItem}>
              <Link href="/builder">Build</Link>
            </li>
            <li className={styles.listItem}>
              <Link href="/sections">Sections</Link>
            </li>
            <li className={styles.listItem}>
              <Link href="/resume">Resume</Link>
            </li>
            <li className={styles.listItem}>
              <LogoutButton />
            </li>
          </>
        ) : (
          <li className={styles.listItem}>
            <Link href="/login">Login</Link>
          </li>
        )}
      </ul>
    </nav>
  );
}
