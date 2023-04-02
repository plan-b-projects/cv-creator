import React, { useState } from 'react';
import { useFieldArray, useFormContext, useWatch } from 'react-hook-form';
import { CvFormValues } from '../../shared-types';
import { Button } from '../../helpers/button';
import { FieldGroup } from './field-group';
import {
  Fieldset,
  FieldsetContent,
  Legend,
  List,
  ListItem,
  MeasuringWrapper,
  ProgressBar,
  ProgressBarCompleted,
} from './form-styles';
import { useMeasuredHeight } from '../../helpers/useMeasuredHeight';

const NUMBER_OF_QUESTIONS = 4;

export default function Education() {
  const [isExpanded, setIsExpanded] = useState(false);
  const { measuringWrapperRef, measuredHeight } = useMeasuredHeight();
  const height = isExpanded ? measuredHeight : 0;
  const values = useWatch<CvFormValues, 'education'>({ name: 'education' });
  const answeredQuestions = values?.length
    ? Object.values(values[0]).filter((v) => !!v).length
    : 0;
  const percentageCompleted =
    100 *
    (Math.min(answeredQuestions, NUMBER_OF_QUESTIONS) / NUMBER_OF_QUESTIONS);

  const { control } = useFormContext<CvFormValues>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'education',
  });

  return (
    <Fieldset aria-label="Education and Training">
      <ProgressBar isExpanded={isExpanded}>
        <ProgressBarCompleted percentageCompleted={percentageCompleted} />
        <Legend
          isExpanded={isExpanded}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          Education and Training
        </Legend>
      </ProgressBar>

      <FieldsetContent height={height}>
        <MeasuringWrapper ref={measuringWrapperRef}>
          <Button
            type="button"
            onClick={() =>
              append({
                school: '',
                course: '',
                duration: '',
                description: '',
              })
            }
          >
            Add Education
          </Button>
          <List>
            {fields.map((educationItem, index) => (
              <ListItem key={educationItem.id}>
                <FieldGroup
                  name={`education.${index}.course`}
                  label="Course"
                  placeholder="JavaScript Bootcamp"
                />

                <FieldGroup
                  name={`education.${index}.school`}
                  label="Name"
                  placeholder="School of Applied Technology"
                />

                <FieldGroup
                  name={`education.${index}.duration`}
                  label="Duration"
                  placeholder="12 Jan 2023 - 13 Apr 2023"
                />

                <FieldGroup
                  name={`education.${index}.description`}
                  label="Description"
                  placeholder="Learn JavaScript and TypeScript"
                  inputType="textarea"
                />

                <Button type="button" onClick={() => remove(index)}>
                  Remove
                </Button>
              </ListItem>
            ))}
          </List>
        </MeasuringWrapper>
      </FieldsetContent>
    </Fieldset>
  );
}
