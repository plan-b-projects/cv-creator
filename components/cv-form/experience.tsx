import { useState } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import styled from 'styled-components';
import { CvFormValues } from '../../shared-types';
import { Button } from '../button';
import { FieldGroup } from './field-group';
import { List, ListItem } from './lists-styles';

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
                label="Name"
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
  width: 95%;
  padding: 15px 0;
  padding-left: 20px;
  font-weight: ${(props) => (props.isExpanded ? '700' : '400')};
`;
