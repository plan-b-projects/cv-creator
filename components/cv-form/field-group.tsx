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
  padding-inline: 10px;
  margin-left: 10px
`;

export const Input = styled.input`
  padding: 3px;
  border: 0;
  border-bottom: 1px solid #000;
  width: 100%;
`;

const Textarea = styled.textarea`
  padding: 3px;
  border: 0;
  border-bottom: 1px solid #000;
  width: 100%;
  font-family: inherit;
`;

export const Label = styled.label`
  display: block;
`;

const Select = styled.select`
  padding: 3px;
  width: 100%;
`;
