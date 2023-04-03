import React, { useState } from 'react';
import { useWatch } from 'react-hook-form';
import { colors } from '../../../helpers/theme';
import { useMeasuredHeight } from '../../../helpers/useMeasuredHeight';
import { CvFormValues } from '../../../shared-types';
import {
  Fieldset,
  FieldsetContent,
  Legend,
  MeasuringWrapper,
  ProgressBar,
  ProgressBarCompleted,
} from '../form-styles';
import SkillsInput from './skills-input';

const NUMBER_OF_QUESTIONS = 4;

export default function SkillsForm() {
  const [isExpanded, setIsExpanded] = useState(false);
  const { measuringWrapperRef, measuredHeight } = useMeasuredHeight();
  const height = isExpanded ? measuredHeight : 0;
  const values = useWatch<CvFormValues, 'skills'>({ name: 'skills' });
  const answeredQuestions = values
    ? Object.values(values).filter((v) => v.length > 0).length
    : 0;
  const percentageCompleted =
    100 *
    (Math.min(answeredQuestions, NUMBER_OF_QUESTIONS) / NUMBER_OF_QUESTIONS);

  return (
    <Fieldset aria-label="Skills">
      <ProgressBar isExpanded={isExpanded}>
        <ProgressBarCompleted percentageCompleted={percentageCompleted} color={colors.yellow} />
        <Legend
          isExpanded={isExpanded}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          Skills
        </Legend>
      </ProgressBar>

      <FieldsetContent height={height} color={colors.yellow}>
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
