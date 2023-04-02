import styled, { keyframes } from 'styled-components';
import { isExternal } from 'util/types';
import { colors } from '../../helpers/theme';

export const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style-type: none;
`;

export const ListItem = styled.li``;

export const FieldsetContent = styled.div<{ height: number }>`
  background-color: ${colors.purple};
  border-radius: 0 0 10px 10px;
  color: ${colors.dark};
  transition: height 0.5s;
  overflow: hidden;
  height: ${(props) => props.height}px;
`;

export const MeasuringWrapper = styled.div`
  padding: 10px;
`;

export const Fieldset = styled.fieldset`
  border: none;
  padding: 0;
  margin: 20px 0;
`;

const LEGEND_HEIGHT = '50px';

export const ProgressBar = styled.div<{ isExpanded: boolean }>`
  z-index: 0;
  position: relative;
  border-radius: ${(props) => (props.isExpanded ? '10px 10px 0 0' : '10px')};
  transition: border-radius ${(props) =>
    props.isExpanded ? '0' : '.5s'} cubic-bezier(1,0,1,0), background 1s ease;
  width: 100%;
  height: ${LEGEND_HEIGHT};
  background-color: white;
  overflow: hidden;
`;

export const ProgressBarCompleted = styled.div<{ percentageCompleted: number }>`
  position: absolute;
  left: 0;
  top: 0;
  width: ${props => props.percentageCompleted}%;
  height: ${LEGEND_HEIGHT};
  background-color: ${colors.purple};
  transition: width .5s;
`;

export const Legend = styled.div<{ isExpanded: boolean }>`
  z-index: 1;
  position: relative;
  padding-left: 20px;
  width: 100%;
  line-height: ${LEGEND_HEIGHT};
  font-weight: ${(props) => (props.isExpanded ? '700' : '400')};
  color: ${colors.dark};
  font-size: 18px;
`;