import { FormProvider, useForm } from 'react-hook-form';
import BasicInfo from './basic-info';
import Education from './education';
import Experience from './experience';
import Languages from './languages';
import SkillsSection from './skills-section';
import { FormValues } from './types';

export default function Form() {
  const methods = useForm<FormValues>();

  const saveDraft = () => {
    const data = methods.getValues();
    console.log('saving draft with values', data);
  }

  const submitForm = methods.handleSubmit((data) => {
    console.log('all data is valid and submitting form', data)
  })

  return (
    <FormProvider {...methods}>
      <form onSubmit={submitForm}>
        <BasicInfo />
        <Education />
        <Experience />
        <SkillsSection />
        <Languages />

        <button type="button" onClick={saveDraft}>Save draft</button>
        <button type="submit">Save and select template</button>
      </form>
    </FormProvider>
  );
}
