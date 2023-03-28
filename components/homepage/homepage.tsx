import styles from "../header/header.module.css"
import router from "next/router"

export default function HomePage() {
    return (
        <div>
            <button className={styles.cvButton} type="button" onClick={() => router.push('/cv-form')}>
                Create a new CV
            </button>
            <h2>Your CV</h2>
            <button className={styles.cvButton} type="button" onClick={() => router.push('/cv-form/templates/template-a')}>
                GO TO CV
            </button>
        </div>
    )
}
