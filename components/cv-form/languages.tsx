import { useState } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import styled from 'styled-components';
import { CvFormValues } from '../../shared-types';
import { Button } from '../button';
import { FieldGroup } from './field-group';
import { List, ListItem } from './lists-styles';

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
