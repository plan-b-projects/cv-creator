import { useFieldArray, useFormContext } from 'react-hook-form';
import { CvFormValues } from '../../shared-types';

export default function Education() {
  const {
    register,
    formState: { errors },
    control,
  } = useFormContext<CvFormValues>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'education',
  });

  return (
    <fieldset>
      <legend>Education and Training</legend>
      <button
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
      </button>
      <ul>
        {fields.map((educationItem, index) => (
          <li key={educationItem.id}>
            <label htmlFor={`education.${index}.course`}>Course:</label>
            <input
              {...register(`education.${index}.course`, {
                required: 'This is required.',
              })}
              placeholder="JavaScript Bootcamp"
            />
            {errors?.education?.[index]?.course && (
              <p>{errors.education[index]!.course!.message}</p>
            )}

            <label htmlFor={`education.${index}.school`}>Name:</label>
            <input
              {...register(`education.${index}.school`, {
                required: 'This is required.',
              })}
              placeholder="School of Applied Technology"
            />
            {errors?.education?.[index]?.school && (
              <p>{errors.education[index]!.school!.message}</p>
            )}

            <label htmlFor={`education.${index}.duration`}>Duration:</label>
            <input
              {...register(`education.${index}.duration`, {
                required: 'This is required.',
              })}
              placeholder="12 Jan 2023 - 13 Apr 2023"
            />
            {errors?.education?.[index]?.duration && (
              <p>{errors.education[index]!.duration!.message}</p>
            )}

            <label htmlFor={`education.${index}.description`}>
              Description:
            </label>
            <textarea
              {...register(`education.${index}.description`, {
                required: 'This is required.',
              })}
              placeholder="Learn JavaScript and TypeScript"
            />
            {errors?.education?.[index]?.description && (
              <p>{errors.education[index]!.description!.message}</p>
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
