import { useState } from 'react';
import styled from 'styled-components';
import { Fieldset, FieldsetContent, Legend } from '../form-styles';
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

