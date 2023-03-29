import { useState } from 'react';
import styled from 'styled-components';
import SkillsInput from './skills-input';

export default function SkillsForm() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Fieldset>
      <Legend
        isExpanded={isExpanded}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        Skills
      </Legend>
      <FieldsetContent isExpanded={isExpanded}>
        <SkillsInput skillLabel="Frontend" skillType="frontend" />
        <SkillsInput skillLabel="Backend" skillType="backend" />
        <SkillsInput skillLabel="Tools and technologies" skillType="tools" />
        <SkillsInput skillLabel="General" skillType="general" />
      </FieldsetContent>
    </Fieldset>
  );
}

const FieldsetContent = styled.div<{ isExpanded: boolean }>`
  display: ${(props) => (props.isExpanded ? 'block' : 'none')};
  padding-top: 10px;
  margin-left: 10px;
`;

const Fieldset = styled.fieldset`
  border: none;
  padding: 0;
  margin: 20px 0;
`;
const Legend = styled.legend<{ isExpanded: boolean }>`
  border-radius: 2px;
  background-color: #a0d6fc;
  width: 97%;
  padding: 15px 0;
  padding-left: 20px;
  font-weight: ${(props) => (props.isExpanded ? '700' : '400')};
`;
