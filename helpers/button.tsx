import styled, { css } from 'styled-components';
import { colors, mediaScreen } from './theme';

const buttonStyle = css`
  padding: 10px 20px;
  display: inline-block;
  border-radius: 20px;
  background: ${colors.purple};
  color: ${colors.dark};
  font-size: 16px;
  font-weight: 400;
  cursor: pointer;

  &:hover {
    background: ${colors.dark};
    color: ${colors.purple};
  }

  &:disabled {
    cursor: not-allowed;
    background: ${colors.transparent};
    color: ${colors.light};
  }

  @media (max-width: ${mediaScreen.small}) {
    padding: 10px 20px;
    font-size: 14px;
  }
`;

export const ButtonLink = styled.a`
  ${buttonStyle}
  text-decoration: none;
`;

export const Button = styled.button`
  ${buttonStyle}
  outline: 0;
  border: 0;

  @media (max-width: ${mediaScreen.small}) {
    margin: 10px 0;
  }
`;

export const ButtonSecondary = styled(Button)`
  background: #1f1f1f;
  color: #ffffff;
  `
  
export const ButtonLinkSecondary = styled(ButtonLink)`
  background: #1f1f1f;
  color: #ffffff;
`

export const ButtonContainer = styled.div`
  display: flex;
  width: 90%;
  padding: 20px;
  justify-content: space-evenly;
  flex-direction: row;

  @media (max-width: 400px) {
    padding: 10px 9px;
    flex-direction: column;
  }
`;