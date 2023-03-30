import { HTMLInputTypeAttribute } from 'react';
import { get, Path, useFormContext } from 'react-hook-form';
import styled from 'styled-components';
import { CvFormValues } from '../../shared-types';

type Props = {
  label: string;
  name: Path<CvFormValues>;
  placeholder?: string;
  inputType?: HTMLInputTypeAttribute | 'textarea';
  options?: string[];
};

const FieldInput: React.FC<Props> = ({
  name,
  placeholder,
  options,
  inputType,
}) => {
  const { register } = useFormContext<CvFormValues>();

  if (inputType === 'textarea') {
    return <Textarea {...register(name)} placeholder={placeholder} />;
  }

  if (inputType === 'select') {
    return (
      <Select {...register(name)}>
        {options?.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </Select>
    );
  }

  return (
    <Input type={inputType} {...register(name)} placeholder={placeholder} />
  );
};

export const FieldGroup: React.FC<Props> = (props) => {
  const { label, name } = props;

  const {
    formState: { errors },
  } = useFormContext<CvFormValues>();
  const error = get(errors, name);

  return (
    <FieldGroupContainer>
      <Label htmlFor={name}>{label}: </Label>
      <FieldInput {...props} />
      {error && <p>{error.message}</p>}
    </FieldGroupContainer>
  );
};

export const FieldGroupContainer = styled.div`
  margin: 10px;
  padding-right: 10px;
`;

export const Input = styled.input`
  padding: 3px;
  border: 0;
  width: 100%;
  padding: 8px;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 5px;
`;

const Textarea = styled.textarea`
  padding: 3px;
  border: 0;
  width: 100%;
  font-family: inherit;
  padding: 8px;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 5px;
`;

export const Label = styled.label`
  display: block;
  font-size: 14px;
  padding-bottom: 5px;
`;

const Select = styled.select`
  padding: 8px;
  width: calc(100% + 16px);
  border: 0;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 5px;
`;
