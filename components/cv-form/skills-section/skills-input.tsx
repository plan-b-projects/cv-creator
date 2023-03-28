import { useRef } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import styled from 'styled-components';
import { CvFormValues } from '../../../shared-types';
import { Button } from '../../button';
import { FieldGroupContainer, Input, Label } from '../field-group';

type Props = {
  skillType: keyof CvFormValues['skills'];
  skillLabel: string;
};

export default function SkillsInput({ skillType, skillLabel }: Props) {

  const inputRef = useRef<HTMLInputElement>(null);
  const { control, register } = useFormContext<CvFormValues>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: `skills.${skillType}`,
  });

  return (
    <FieldGroupContainer>
      <Label htmlFor={skillType}>{skillLabel}:</Label>
      <Input
        type="text"
        ref={inputRef}
        onKeyDown={(event) => {
          const value = inputRef.current!.value;
          if (event.key === 'Enter') {
            event.preventDefault();
            inputRef.current!.value = '';
            if (!fields.some((field) => field.name === value)) {
              append({ name: value });
            }
          }
        }}
      />

      {fields.map((field, index) => (
        <input
          type="hidden"
          key={field.id}
          {...register(`skills.${skillType}.${index}`)}
        />
      ))}

      {fields.map((field, index) => (
        <Chip key={field.id}>
          {field.name}{' '}
          <ChipButton type="button" onClick={() => remove(index)}>
            x
          </ChipButton>
        </Chip>
      ))}
    </FieldGroupContainer>
  );
}

const ChipButton = styled.button`
  padding: 5px;
  background: transparent;
  border: 0;
  outline: 0;
  font-size: 16px;
`;

const Chip = styled.div`
  margin: 10px;
  margin-left: 0;
  border-radius: 6px;
  padding: 5px 0 5px 15px;
  display: inline-block;
  background: #eaeaea;
`;
