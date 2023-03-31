import { useState } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import styled from 'styled-components';
import { CvFormValues } from '../../shared-types';
import { Button } from '../../helpers/button';
import { FieldGroup } from './field-group';
import { Fieldset, FieldsetContent, Legend, List, ListItem } from './form-styles';
import { colors } from '../../helpers/theme';

export default function Languages() {
  const [isExpanded, setIsExpanded] = useState(false);
  const { control } = useFormContext<CvFormValues>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'languages',
  });

  return (
    <Fieldset>
      <Legend
        isExpanded={isExpanded}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        Languages
      </Legend>
      <FieldsetContent isExpanded={isExpanded}>
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
      </FieldsetContent>
    </Fieldset>
  );
}

