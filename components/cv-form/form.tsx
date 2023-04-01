import { FormProvider, useForm } from 'react-hook-form';
import BasicInfo from './basic-info';
import Education from './education';
import Experience from './experience';
import Languages from './languages';
import SkillsSection from './skills-section';
import { CvFormValues } from '../../shared-types';
import { useRouter } from 'next/router';
import { Button } from '../../helpers/button';
import styled from 'styled-components';
import { H1, mediaScreen } from '../../helpers/theme';

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
    router.push('/cv-form/templates');
  });

  return (
    <FormProvider {...methods}>
      <H1>Fill in Your CV</H1>
      <FormContainer>
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
              data-testid="save_and_create_cv"
              onClick={submitForm}
            >
              Save and select template
            </Button>
          </ButtonGroup>
        </StyledForm>
      </FormContainer>
    </FormProvider>
  );
}

const FormContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

const StyledForm = styled.form`
  padding: 10px;
  width: 90%;
  max-width: 600px;
`;

const ButtonGroup = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  @media (max-width: 400px) {
    flex-direction: column;
  }
`;
