import styled from 'styled-components';
import { colors } from '../../helpers/theme';

export const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style-type: none;
`;

export const ListItem = styled.li``;


export const FieldsetContent = styled.div<{ isExpanded: boolean }>`
  display: ${(props) => (props.isExpanded ? 'block' : 'none')};
  padding: 10px;
  margin-inline: 10px;
  background-color: ${colors.purple};
  border-radius: 0 0 10px 10px;
  color: ${colors.dark};
`;

export const Fieldset = styled.fieldset`
  border: none;
  padding: 0;
  margin: 20px 0;
`;

export const Legend = styled.legend<{ isExpanded: boolean }>`
  border-radius: ${(props) => (props.isExpanded ? '10px 10px 0 0' : '10px')};
  background-color: ${colors.purple};
  width: calc(100% - 40px);
  margin: 10px;
  margin-bottom: 0;
  padding: 15px 0 15px 20px;
  font-weight: ${(props) => (props.isExpanded ? '700' : '400')};
  color: ${colors.dark};
  font-size: 18px;
`;