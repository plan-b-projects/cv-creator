import Layout from '../components/layout';
import Link from 'next/link';
import { signIn, signOut, useSession } from 'next-auth/react';
// import styles from "../components/header/header.module.css"
import { User } from '../db/db';
import HomePage from '../components/homepage/homepage';
import styled from 'styled-components';

const ButtonLink = styled.a`
  padding: 8px 20px;
  text-decoration: none;
  color: #000;
  display: inline-block;
  border: 2px solid #000;
  border-radius: 4px;

  &:hover {
    background: #353535;
    color: #fff;
  }
`

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

  const { data: session, status } = useSession();
  const loading = status === 'loading';

  if (session) {
    logInUser({ email: session.user!.email! });
  }

  return (
    <Layout>
      <h1>CV Creator App</h1>

      <div>
        <div>
          {!session && (
            <>
              <span>You are not signed in</span>
              <ButtonLink
                href={`/api/auth/signin`}
                onClick={(e) => {
                  e.preventDefault();
                  signIn();
                }}
              >
                Sign in
              </ButtonLink>
            </>
          )}
          {session?.user && (
            <>
              <div>
                <div>
                  {session.user.image && (
                    <span
                      style={{
                        backgroundImage: `url('${session.user.image}')`,
                      }}
                    />
                  )}
                  <span>
                    <small>Signed in as</small>
                    <br />
                    <strong>{session.user.email ?? session.user.name}</strong>
                  </span>
                  <a
                    href={`/api/auth/signout`}
                    onClick={(e) => {
                      e.preventDefault();
                      signOut();
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
  );
}
