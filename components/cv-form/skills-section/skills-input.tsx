import { useRef } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { CvFormValues } from '../../../shared-types';

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
    <>
      <label htmlFor={skillType}>{skillLabel}:</label>
      <input
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
        <div key={field.id}>
          {field.name}{' '}
          <button type="button" onClick={() => remove(index)}>
            x
          </button>
        </div>
      ))}
    </>
  );
}
