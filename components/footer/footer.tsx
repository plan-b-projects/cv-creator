import styled from 'styled-components';

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
          <em>&copy; {year} &lt;/salt&gt;</em>
        </List>
      </NavList>
    </FooterBox>
  );
}

const FooterBox = styled.footer`
  width: 100%;
  height: 50px;
  background-color: #a0d6fc;
`;

const NavList = styled.ul`
  margin-bottom: 8px;
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
  line-height: 50px;
`;

const GitHub = styled.a`
  text-decoration: none;
  width: 100%;
  color: #262a74;
`;
