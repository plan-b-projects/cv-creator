import styles from "../footer/footer.module.css"

export default function Footer() {
  const date = new Date();
  const year = date.getFullYear();
  
  return (
    <footer className={styles.footer}>
      <hr />
      <ul className={styles.navItems}>
        <li className={styles.navItem}>
         <a target="_blank" href="https://github.com/plan-b-projects/cv-creator">GitHub</a>
        </li>
        <li className={styles.navItem}>
          <em>&copy; {year} &lt;/salt&gt;</em>
        </li>
      </ul>
    </footer>
  )
}
