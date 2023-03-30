import { signOut, useSession } from 'next-auth/react';
import React from 'react';
import styled from 'styled-components';
import { colors, mediaScreen } from '../helpers/theme';

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
  display: flex;
  flex-direction: row;
  justify-content: flex-end;

`;

const Chip = styled.div`
  max-width: 260px;
  padding: 8px;
  display: flex;
  border-radius: 40px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  align-items: center;
  background-color: ${colors.transparent};

  @media only screen and (max-width: ${mediaScreen.small}) {
    width: 115px;
  }
`;

const ImageAcc = styled.div`
  flex: 0 0 35px;
  background-size: 100% 100%;
  height: 35px;
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

  @media (max-width: ${mediaScreen.small}) {
    visibility: hidden;
    max-width: 1px;
    margin: 0 5px;
  }
`;

const SignOut = styled.a`
  font-weight: 700;
  font-size: 14px;
  color: ${colors.dark};
  margin-right: 8px;
  text-decoration: none;
  cursor: pointer;

  &:hover{
    color: ${colors.light};
  }

  @media (max-width:${mediaScreen.small}) {
    margin-right: 4px;
  }
`;
