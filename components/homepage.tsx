import Layout from "../components/layout"
import Link from "next/link"
import { signIn, signOut, useSession } from "next-auth/react"
import styles from "components/header.module.css"
import { User } from '../db/db'
import router from "next/router"



export default function HomePage() {
    return (
        <div>
            <button className={styles.cvButton} type="button" onClick={() => router.push('/cv-form')}>
                Create a new cv.
            </button>
        </div>
    )
}
