import React, { useState } from 'react';
import { useMeasuredHeight } from '../../../helpers/useMeasuredHeight';
import {
  Fieldset,
  FieldsetContent,
  Legend,
  MeasuringWrapper,
} from '../form-styles';
import SkillsInput from './skills-input';

export default function SkillsForm() {
  const [isExpanded, setIsExpanded] = useState(false);
  const { measuringWrapperRef, measuredHeight } = useMeasuredHeight();
  const height = isExpanded ? measuredHeight : 0;

  return (
    <Fieldset>
      <Legend
        isExpanded={isExpanded}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        Skills
      </Legend>
      <FieldsetContent height={height}>
        <MeasuringWrapper ref={measuringWrapperRef}>
          <SkillsInput skillLabel="Frontend" skillType="frontend" />
          <SkillsInput skillLabel="Backend" skillType="backend" />
          <SkillsInput skillLabel="Tools and technologies" skillType="tools" />
          <SkillsInput skillLabel="General" skillType="general" />
        </MeasuringWrapper>
      </FieldsetContent>
    </Fieldset>
  );
}
