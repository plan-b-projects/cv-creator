import Layout from '../components/layout';
import { signIn, useSession } from 'next-auth/react';
import { User } from '../db/db';
import HomePage from '../components/homepage/homepage';
import styled from 'styled-components';
import { ButtonLink } from '../helpers/button';
import { H1, Text } from '../helpers/theme';

const logInUser = async (credentials: User) => {
  const response = await fetch(
    '/api/users',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    },
  );
  const status = response.status;
  const data = await response.json();
  return { status, data };
};

export default function IndexPage() {
  const { data: session, status } = useSession();

  if (session) {
    logInUser({ email: session.user!.email! });
  }

  return (
    <Layout>
      <>
        {!session && (
          <>
            <NotSignedIn>
              <H1>Welcome to our CV Creator App</H1>
              <Text>Sign in to create CVs</Text>
              <br />
              <ButtonLink
                data-testid="sign_in"
                href={`/api/auth/signin`}
                onClick={(e) => {
                  e.preventDefault();
                  signIn();
                }}
              >
                Sign in
              </ButtonLink>
            </NotSignedIn>
          </>
        )}
        {session?.user && (
          <>
            <H1>Welcome!</H1>
            <HomePage />
          </>
        )}
      </>
    </Layout>
  );
}

const NotSignedIn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
