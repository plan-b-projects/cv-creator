import { FormProvider, useForm } from 'react-hook-form';
import BasicInfo from './basic-info';
import Education from './education';
import Experience from './experience';
import Languages from './languages';
import SkillsSection from './skills-section';
import { CvFormValues } from '../../shared-types';
import { useRouter } from 'next/router';
import { Button } from '../button';
import styled from 'styled-components';

const getFormValues = async () => {
  const response = await fetch('http://localhost:3000/api/users/cv-form', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (response.ok) {
    return await response.json();
  } else {
    return {};
  }
};

const saveForm = async (data: CvFormValues) => {
  const response = await fetch('http://localhost:3000/api/users/cv-form', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  return response.ok;
};

export default function Form() {
  const methods = useForm<CvFormValues>({ defaultValues: getFormValues });
  const router = useRouter();

  const saveDraft = async () => {
    const data = methods.getValues();
    await saveForm(data);
  };

  const submitForm = methods.handleSubmit(async (data) => {
    await saveForm(data);
  });

  return (
    <FormProvider {...methods}>
      <Header>Fill in Your CV</Header>
      <StyledForm onSubmit={submitForm}>
        <BasicInfo />
        <Education />
        <Experience />
        <SkillsSection />
        <Languages />

        <ButtonGroup>
          <Button type="button" onClick={saveDraft}>
            Save draft
          </Button>
          <Button
            type="submit"
            onClick={() => router.push('/cv-form/templates')}
          >
            Save and select template
          </Button>
        </ButtonGroup>
      </StyledForm>
    </FormProvider>
  );
}

const StyledForm = styled.form`
  padding: 10px;
`;

const ButtonGroup = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const Header = styled.h1`
  text-align: center;
  padding-inline: 30px;
  margin-bottom: 10px;
`;