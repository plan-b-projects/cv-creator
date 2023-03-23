import Layout from "../components/layout"
import Link from "next/link"
import { signIn, signOut, useSession } from "next-auth/react"
import styles from "components/header.module.css"
import { User } from '../db/db'
import HomePage from "../components/homepage"

const logInUser = async (credentials: User) => {
  const response = await fetch('http://localhost:3000/api/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });
  const status = response.status;
  const data = await response.json();
  return { status, data };
};

export default function IndexPage() {
  const { data: session, status } = useSession()
  const loading = status === "loading"

  if (session) {
    logInUser({ email: session.user!.email! })
  }

  return (
    <Layout>
      <h1>CV Creator App</h1>

      <div className={styles.signedInStatus}>
        <div
          className={`nojs-show ${!session && loading ? styles.loading : styles.loaded
            }`}
        >
          {!session && (
            <>
              <span className={styles.notSignedInText}>
                You are not signed in
              </span>
              <a
                href={`/api/auth/signin`}
                className={styles.buttonPrimary}
                onClick={(e) => {
                  e.preventDefault()
                  signIn()
                }}
              >
                Sign in
              </a>
            </>
          )}
          {session?.user && (
            <>
              <div>
                <div>
                  {session.user.image && (
                    <span
                      style={{ backgroundImage: `url('${session.user.image}')` }}
                      className={styles.avatar} />
                  )}
                  <span className={styles.signedInText}>
                    <small>Signed in as</small>
                    <br />
                    <strong>{session.user.email ?? session.user.name}</strong>
                  </span>
                  <a
                    href={`/api/auth/signout`}
                    className={styles.button}
                    onClick={(e) => {
                      e.preventDefault()
                      signOut()
                    }}
                  >
                    Sign out
                  </a>
                </div>
              </div>
              <HomePage />
            </>
          )}
        </div>
      </div>
    </Layout>
  )
}
