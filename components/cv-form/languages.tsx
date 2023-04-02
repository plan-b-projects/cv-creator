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

export default function Languages() {
  const [isExpanded, setIsExpanded] = useState(false);
  const { measuringWrapperRef, measuredHeight } = useMeasuredHeight();
  const height = isExpanded ? measuredHeight : 0;
  const values = useWatch<CvFormValues, 'languages'>({ name: 'languages' });
  const percentageCompleted = values?.[0]?.name ? 100 : 0;

  const { control } = useFormContext<CvFormValues>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'languages',
  });

  return (
    <Fieldset aria-label="Languages">
      <ProgressBar isExpanded={isExpanded}>
        <ProgressBarCompleted percentageCompleted={percentageCompleted} />
        <Legend
          isExpanded={isExpanded}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          Languages
        </Legend>
      </ProgressBar>

      <FieldsetContent height={height}>
        <MeasuringWrapper ref={measuringWrapperRef}>
          <Button
            type="button"
            onClick={() =>
              append({
                name: '',
                fluency: 'Elementary',
              })
            }
          >
            Add Language
          </Button>
          <List>
            {fields.map((languageItem, index) => (
              <ListItem key={languageItem.id}>
                <FieldGroup
                  name={`languages.${index}.name`}
                  label="Language"
                  placeholder="English"
                />

                <FieldGroup
                  name={`languages.${index}.fluency`}
                  label="Fluency"
                  inputType="select"
                  options={['Elementary', 'Intermediate', 'Fluent', 'Native']}
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
