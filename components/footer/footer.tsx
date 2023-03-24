import styles from "../footer/footer.module.css"

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <hr />
      <ul className={styles.navItems}>
        <li className={styles.navItem}>
          <em>Contact us</em>
        </li>
        <li className={styles.navItem}>
          <em>2023</em>
        </li>
      </ul>
    </footer>
  )
}
