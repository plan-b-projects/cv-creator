import styled from 'styled-components';
import { colors } from '../../helpers/theme';

export default function Footer() {
  const date = new Date();
  const year = date.getFullYear();

  return (
    <FooterBox>
      <NavList>
        <List>
          <GitHub
            target="_blank"
            href="https://github.com/plan-b-projects/cv-creator"
          >
            GitHub
          </GitHub>
        </List>
        <List>
          <small>&copy; {year} &lt;/salt&gt;</small>
        </List>
      </NavList>
    </FooterBox>
  );
}

const FooterBox = styled.footer`
  width: 100%;
  height: 60px;
  background-color: ${colors.dark};
`;

const NavList = styled.ul`
  margin-bottom: 8px;
  margin-top: 0;
  padding: 0;
  font-size: 16px;
  display: flex;
  width: 100%;
  align-content: center;
  list-style: none;
  justify-content: center;
`;

const List = styled.li`
  flex: 2 1;
  text-align: center;
  line-height: 60px;
  color: ${colors.light};
`;

const GitHub = styled.a`
  text-decoration: none;
  width: 100%;
  color:${colors.light};
  font-weight: 700;
`;
