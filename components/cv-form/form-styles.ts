import styled from 'styled-components';
import { colors } from '../../helpers/theme';

export const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style-type: none;
`;

export const ListItem = styled.li``;


export const FieldsetContent = styled.div<{ height: number }>`
  background-color: ${colors.purple};
  margin-inline: 10px;
  border-radius: 0 0 10px 10px;
  color: ${colors.dark};
  transition: height .5s;
  overflow: hidden;
  height: ${props => props.height}px;
  padding-bottom: 15px;
`;

export const MeasuringWrapper = styled.div`
  padding: 10px;
  padding-bottom: 0;
`

export const Fieldset = styled.fieldset`
  border: none;
  padding: 0;
  margin: 20px 0;
`;

export const Legend = styled.legend<{ isExpanded: boolean }>`
  border-radius: ${(props) => (props.isExpanded ? '10px 10px 0 0' : '10px')};
  border-radius: 10px 10px 0 0;
  background-color: ${colors.purple};
  width: calc(100% - 40px);
  margin: 10px;
  margin-bottom: 0;
  padding: 15px 0 0 20px;
  font-weight: ${(props) => (props.isExpanded ? '700' : '400')};
  color: ${colors.dark};
  font-size: 18px;
`;