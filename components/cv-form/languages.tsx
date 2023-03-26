import { useFieldArray, useFormContext } from 'react-hook-form';
import { CvFormValues } from '../../shared-types';

export default function Languages() {
  const {
    register,
    formState: { errors },
    control,
  } = useFormContext<CvFormValues>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'languages',
  });

  return (
    <fieldset>
      <legend>Languages</legend>
      <button
        type="button"
        onClick={() =>
          append({
            name: '',
            fluency: 'Elementary',
          })
        }
      >
        Add Language
      </button>
      <ul>
        {fields.map((languageItem, index) => (
          <li key={languageItem.id}>
            <label htmlFor={`languages.${index}.name`}>Language:</label>
            <input
              {...register(`languages.${index}.name`, {
                required: 'This is required.',
              })}
              placeholder="English"
            />
            {errors?.languages?.[index]?.name && (
              <p>{errors.languages[index]!.name!.message}</p>
            )}

            <label htmlFor={`languages.${index}.fluency`}>Fluency:</label>
            <select {...register(`languages.${index}.fluency`)}>
              <option value="Elementary">Elementary</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Fluent">Fluent</option>
              <option value="Native">Native</option>
            </select>

            <button type="button" onClick={() => remove(index)}>
              Remove
            </button>
          </li>
        ))}
      </ul>
    </fieldset>
  );
}
