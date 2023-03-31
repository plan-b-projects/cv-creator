import Link from 'next/link';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { colors, mediaScreen } from '../../helpers/theme';
import LogInChip from '../log-in-chip';

export default function Header() {
  const router = useRouter();

  return (
    <HeaderContainer>
      <NavItems>
        <NavList>
          <List isActive={router.pathname === '/'}>
            <NavListLink href="/">Home</NavListLink>
          </List>
          <List isActive={router.pathname === '/documentation'}>
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
  
  @media (max-width: ${mediaScreen.small}){
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
  text-align: center;

  @media (max-width: ${mediaScreen.small}){
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
    ${colors.dark};

  &:hover {
    border-bottom: 2px solid ${colors.dark};
  }

  @media (max-width: ${mediaScreen.small}){
    padding-bottom: 8px;
    padding-inline: 0;
    font-size: 14px;
  }
`;

const NavListLink = styled(Link)`
  text-decoration: none;
  width: 100%;
  color: ${colors.dark};
`;
