import { signOut, useSession } from 'next-auth/react';
import React from 'react';
import styled from 'styled-components';
import { ButtonLink } from './button';

const LogInChip: React.FC = () => {
  const { data: session } = useSession();
  if (!session?.user) {
    return null;
  }

  return (
    <Container>
      <Chip>
        {session.user.image && (
          <ImageAcc
            style={{
              backgroundImage: `url('${session.user.image}')`,
            }}
          />
        )}
        <NameAcc>
          <small>Signed in as</small>
          <br />
          <strong>
            {session.user.email ?? session.user.name} alsdjfalskdjflaksdjfasd
          </strong>
        </NameAcc>
        <SignOut
          href={`/api/auth/signout`}
          onClick={(e) => {
            e.preventDefault();
            signOut();
          }}
        >
          Sign out
        </SignOut>
      </Chip>
    </Container>
  );
};

export default LogInChip;

const Container = styled.div`
  margin: 10px;
  margin-top: 15px;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;

const Chip = styled.div`
  max-width: 76%;

  padding: 10px 20px 10px 10px;
  display: flex;
  border-radius: 40px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  align-items: center;
`;

const ImageAcc = styled.div`
  flex: 0 0 40px;
  background-size: 100% 100%;
  width: 40px;
  height: 40px;
  border-radius: 50%;
`;

const NameAcc = styled.div`
  flex: 0 1 auto;
  margin: 0 10px;
  text-overflow: ellipsis;
  font-size: 12px;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 50%;
`;

const SignOut = styled(ButtonLink)`
  flex: 1 0 auto;
  border-radius: 20px;
`;
