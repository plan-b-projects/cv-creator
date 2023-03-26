import { useFieldArray, useFormContext } from 'react-hook-form';
import { FormValues } from './types';

export default function Experience() {
  const {
    register,
    formState: { errors },
    control,
  } = useFormContext<FormValues>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'experience',
  });

  return (
    <fieldset>
      <legend>Experience</legend>
      <button
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
      </button>
      <ul>
        {fields.map((experienceItem, index) => (
          <li key={experienceItem.id}>
            <label htmlFor={`experience.${index}.job`}>Name:</label>
            <input
              {...register(`experience.${index}.job`, {
                required: 'This is required.',
              })}
              placeholder="Full-stack developer"
            />
            {errors?.experience?.[index]?.job && (
              <p>{errors.experience[index]!.job!.message}</p>
            )}

            <label htmlFor={`experience.${index}.company`}>Course:</label>
            <input
              {...register(`experience.${index}.company`, {
                required: 'This is required.',
              })}
              placeholder="</salt>"
            />
            {errors?.experience?.[index]?.company && (
              <p>{errors.experience[index]!.company!.message}</p>
            )}

            <label htmlFor={`experience.${index}.duration`}>Duration:</label>
            <input
              {...register(`experience.${index}.duration`, {
                required: 'This is required.',
              })}
              placeholder="12 Jan 2022 - 13 Apr 2023"
            />
            {errors?.experience?.[index]?.duration && (
              <p>{errors.experience[index]!.duration!.message}</p>
            )}

            <label htmlFor={`experience.${index}.description`}>
              Description:
            </label>
            <textarea
              {...register(`experience.${index}.description`, {
                required: 'This is required.',
              })}
              placeholder="Build full-stack application using Next.js"
            />
            {errors?.experience?.[index]?.description && (
              <p>{errors.experience[index]!.description!.message}</p>
            )}

            <button type="button" onClick={() => remove(index)}>
              Remove
            </button>
          </li>
        ))}
      </ul>
    </fieldset>
  );
}
