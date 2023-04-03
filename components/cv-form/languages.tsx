import React, { useState } from 'react';
import { useFieldArray, useFormContext, useWatch } from 'react-hook-form';
import { CvFormValues } from '../../shared-types';
import { ButtonSecondary } from '../../helpers/button';
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
import { colors } from '../../helpers/theme';

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
        <ProgressBarCompleted percentageCompleted={percentageCompleted} color={colors.red} />
        <Legend
          isExpanded={isExpanded}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          Languages
        </Legend>
      </ProgressBar>

      <FieldsetContent height={height} color={colors.red}>
        <MeasuringWrapper ref={measuringWrapperRef}>
          <ButtonSecondary
            type="button"
            onClick={() =>
              append({
                name: '',
                fluency: 'Elementary',
              })
            }
          >
            Add Language
          </ButtonSecondary>
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
                  options={['Native', 'Fluent', 'Intermediate', 'Elementary']}
                />

                <ButtonSecondary type="button" onClick={() => remove(index)}>
                  Remove
                </ButtonSecondary>
              </ListItem>
            ))}
          </List>
        </MeasuringWrapper>
      </FieldsetContent>
    </Fieldset>
  );
}
