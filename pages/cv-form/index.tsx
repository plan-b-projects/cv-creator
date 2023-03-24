import Layout from '../../components/layout';
import { signIn, signOut, useSession } from 'next-auth/react';
import styles from '../../components/header/header.module.css';
import Form from '../../components/cv-form/forms';
import useNoSession from '../../hooks/useNoSession';

export default function formPage() {
  const { data: session, status } = useSession();

  const loading = status === 'loading';

  useNoSession();

  return (
    <Layout>
      <div className={styles.signedInStatus}>
        <div
          className={`nojs-show ${
            !session && loading ? styles.loading : styles.loaded
          }`}
        >
          {session?.user && (
            <>
              <div>
                <div>
                  {session.user.image && (
                    <span
                      style={{
                        backgroundImage: `url('${session.user.image}')`,
                      }}
                      className={styles.avatar}
                    />
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
                      e.preventDefault();
                      signOut();
                    }}
                  >
                    Sign out
                  </a>
                </div>
              </div>
              <Form />
            </>
          )}
        </div>
      </div>
    </Layout>
  );
}
