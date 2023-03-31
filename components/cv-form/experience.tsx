import { useState } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import styled from 'styled-components';
import { CvFormValues } from '../../shared-types';
import { Button } from '../../helpers/button';
import { FieldGroup } from './field-group';
import { Fieldset, FieldsetContent, Legend, List, ListItem } from './form-styles';

export default function Experience() {
  const [isExpanded, setIsExpanded] = useState(false);

  const { control } = useFormContext<CvFormValues>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'experience',
  });

  return (
    <Fieldset>
      <Legend
        isExpanded={isExpanded}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        Experience
      </Legend>
      <FieldsetContent isExpanded={isExpanded}>
        <Button
          type="button"
          onClick={() =>
            append({
              job: '',
              company: '',
              duration: '',
              description: '',
            })
          }
        >
          Add Experience
        </Button>
        <List>
          {fields.map((experienceItem, index) => (
            <ListItem key={experienceItem.id}>
              <FieldGroup
                name={`experience.${index}.job`}
                label="Title"
                placeholder="Full-stack developer"
              />

              <FieldGroup
                name={`experience.${index}.company`}
                label="Company"
                placeholder="</salt>"
              />

              <FieldGroup
                name={`experience.${index}.duration`}
                label="Duration"
                placeholder="12 Jan 2023 - 13 Apr 2023"
              />

              <FieldGroup
                name={`experience.${index}.description`}
                label="Description"
                placeholder="Build full-stack application using Next.js"
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


