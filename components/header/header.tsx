import Link from 'next/link';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { colors, mediaScreen } from '../../helpers/theme';
import LogInChip from '../log-in-chip';
import { ButtonSecondary } from '../../helpers/button';

export default function Header() {
  const router = useRouter();

  
  return (
    <HeaderContainer>
      {router.pathname === '/'? null :
      <PrevButton onClick={() => router.back()}>
        <svg
          fill={colors.purple}
          height={20}
          width={20}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l128 128c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 288 480 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-370.7 0 73.4-73.4c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-128 128z" />
        </svg>
      </PrevButton>}
      <NavItems>
        <NavList>
          <List isActive={router.pathname === '/'}>
            <NavListLink data-testid="home" href="/">
              Home
            </NavListLink>
          </List>
          <List isActive={router.pathname === '/job-search'}>
            <NavListLink href="/job-search">Job Search</NavListLink>
          </List>
        </NavList>
        <LogInChip />
      </NavItems>
    </HeaderContainer>
  );
}

const HeaderContainer = styled.header`
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  padding: 40px;
  margin-inline: 50px;

  @media (max-width: 800px) {
    margin-inline: 0;
  }
  @media (max-width: ${mediaScreen.small}) {
    padding: 20px 10px;
  }
`;

const NavItems = styled.nav`
  border-radius: 30px;
  margin-bottom: 0;
  height: 50px;
  display: flex;
  padding-left: 30px;
  justify-content: space-around;
  background-color: ${colors.transparent};

  @media (max-width: ${mediaScreen.small}) {
    width: 100%;
  }
`;

const NavList = styled.ul`
  margin-bottom: 0;
  padding: 0;
  font-size: 16px;
  display: flex;
  flex: 1 0 auto;
  align-content: center;
  list-style: none;
  justify-content: center;
`;

const List = styled.li<{ isActive: boolean }>`
  flex: 1 0 auto;
  text-align: center;
  padding-bottom: 10px;
  padding-inline: 30px;
  border-bottom: ${(props) => (props.isActive ? '2px' : '0')} solid
    ${colors.purple};

  &:hover {
    border-bottom: 2px solid ${colors.purple};
  }

  @media (max-width: ${mediaScreen.small}) {
    padding-bottom: 8px;
    padding-inline: 0;
    font-size: 14px;
  }
`;

const NavListLink = styled(Link)`
  text-decoration: none;
  width: 100%;
  color: ${colors.light};

  &:hover {
    color: ${colors.purple};
  }
`;

const PrevButton = styled(ButtonSecondary)`
display: flex; 
align-items: center;
background: ${colors.dark};
margin-right: 50%;

&:hover {
  background: ${colors.transparent};
}

@media (max-width: ${mediaScreen.small}) {
  display: none;
}
`;