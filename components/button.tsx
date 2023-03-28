import styled, { css } from 'styled-components';

const buttonStyle = css`
  padding: 8px 20px;
  display: inline-block;
  border-radius: 4px;
  background: #a0d6fc;
  color: #262a74;
  font-size: 14px;
  font-weight: 400;

  &:hover {
    background: #262a74;
    color: #a0d6fc;
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
`;
