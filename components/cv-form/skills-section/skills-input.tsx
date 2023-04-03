import { useRef } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import styled from 'styled-components';
import { CvFormValues } from '../../../shared-types';
import { Button, ButtonSecondary } from '../../../helpers/button';
import { FieldGroupContainer, Input, Label } from '../field-group';
import { colors } from '../../../helpers/theme';

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

  const addSkill = () => {
    const value = inputRef.current!.value;
    inputRef.current!.value = '';
    if (!fields.some((field) => field.name === value) && value !== '') {
      append({ name: value });
    }
  };

  return (
    <FieldGroupContainer>
      <Label htmlFor={skillType}>{skillLabel}:</Label>
      <InputContainer>
        <SkillInput
          type="text"
          ref={inputRef}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              event.preventDefault();
              addSkill();
            }
          }}
        />

        <SkillButton type="button" onClick={addSkill}>
          Add
        </SkillButton>
      </InputContainer>

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
  padding: 5px 10px;
  background: transparent;
  border: 0;
  outline: 0;
  font-size: 14px;
  color: ${colors.red};
  font-weight: 700;
`;

const Chip = styled.div`
  margin: 10px;
  margin-left: 0;
  border-radius: 6px;
  padding: 5px 0 5px 15px;
  display: inline-block;
  background: ${colors.light};
  color: ${colors.dark};
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const SkillInput = styled(Input)`
  border-bottom-right-radius: 0;
  border-top-right-radius: 0;
`;

const SkillButton = styled(ButtonSecondary)`
  border-bottom-left-radius: 0;
  border-top-left-radius: 0;
  background: ${colors.light};
  color: ${colors.dark};

  &:hover {
    background: ${colors.dark};
    color: ${colors.yellow};
  }
`;
