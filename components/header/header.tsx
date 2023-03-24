import Link from "next/link"
import styles from "../header/header.module.css"

export default function Header() {

  return (
    <header>
      <noscript>
        <style>{`.nojs-show { opacity: 1; top: 0; }`}</style>
      </noscript>
      <nav>
        <ul className={styles.navItems}>
          <li className={styles.navItem}>
            <Link href="/">Home</Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/client">About us</Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}
