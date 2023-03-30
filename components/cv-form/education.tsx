import { useState } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import styled from 'styled-components';
import { CvFormValues } from '../../shared-types';
import { Button } from '../../helpers/button';
import { FieldGroup } from './field-group';
import { Fieldset, FieldsetContent, Legend, List, ListItem } from './form-styles';

export default function Education() {
  const [isExpanded, setIsExpanded] = useState(false);

  const { control } = useFormContext<CvFormValues>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'education',
  });

  return (
    <Fieldset>
      <Legend
        isExpanded={isExpanded}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        Education and Training
      </Legend>

      <FieldsetContent isExpanded={isExpanded}>
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
      </FieldsetContent>
    </Fieldset>
  );
}

