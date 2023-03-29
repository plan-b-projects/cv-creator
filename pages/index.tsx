import Layout from '../components/layout';
import { signIn, useSession } from 'next-auth/react';
import { User } from '../db/db';
import HomePage from '../components/homepage/homepage';
import styled from 'styled-components';
import noSession from '../public/noSession.jpg';
import LogInChip from '../components/log-in-chip';
import { ButtonLink } from '../components/button';

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

  if (session) {
    logInUser({ email: session.user!.email! });
  }

  return (
    <Layout>
      <div>
        <div>
          {!session && (
            <NotSignedIn>
              <Header>Welcome to CV Creator App</Header>
              <span>You are not signed in</span>
              <br />
              <ButtonLink
                href={`/api/auth/signin`}
                onClick={(e) => {
                  e.preventDefault();
                  signIn();
                }}
              >
                Sign in
              </ButtonLink>
              <Image src={noSession.src} />
            </NotSignedIn>
          )}
          <LogInChip />
          {session?.user && (
            <>
              <Header>Welcome!</Header>

              <HomePage />
            </>
          )}
        </div>
      </div>
    </Layout>
  );
}

const Header = styled.h1`
  text-align: center;
  padding-bottom: 30px;
  padding-inline: 30px;
`;

const NotSignedIn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Image = styled.img`
  width: 350px;
  height: 350px;
  margin: 15px;
`;
