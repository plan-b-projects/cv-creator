import Link from 'next/link';
import { useRouter } from 'next/router';
import styled from 'styled-components';

export default function Header() {
  const router = useRouter()

  return (
    <header>
      <NavItems>
        <NavList>
          <List isActive={router.pathname === '/'}>
            <NavListLink href="/">Home</NavListLink>
          </List>
          <List isActive={router.pathname === '/documentation'}>
            <NavListLink href="/documentation">Documentation</NavListLink>
          </List>
        </NavList>
      </NavItems>
    </header>
  );
}

const NavItems = styled.nav`
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  background-color: #a0d6fc
`;

const NavList = styled.ul`
  margin-bottom: 0;
  padding: 0;
  font-size: 16px;
  display: flex;
  width: 100%;
  align-content: center;
  list-style: none;
  justify-content: center;
`;

const List = styled.li<{ isActive: boolean }>`
  flex: 2 1;
  text-align: center;
  padding-bottom: 10px;
  border-bottom: ${props => props.isActive ? '2px' : '0'} solid #262A74;

  &:hover {
    border-bottom: 2px solid #262A74;
  }
`;

const NavListLink = styled(Link)`
  text-decoration: none;
  width: 100%;
  color: #262A74;
`;
