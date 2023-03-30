import router from 'next/router';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Button } from '../../helpers/button';
import { H1, H2 } from '../../helpers/theme';
import { CvFormValues } from '../../shared-types';

export default function HomePage() {
  const [cvs, setCvs] = useState<any>([]);

  const getCvs = async () => {
    const response = await fetch('http://localhost:3000/api/users/cv-form', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      const newData = [await response.json()];

      return setCvs(newData);
    } else {
      return {};
    }
  };

  useEffect(() => {
    getCvs();
  }, []);

  return (
    <HomePageArea>
      <Button type="button" onClick={() => router.push('/cv-form')}>
        Create a new CV
      </Button>
      <H2>Your CVs Collection</H2>

      {cvs.map((cv: CvFormValues) => {
        console.log(cv);

        return (
          <Button
            type="button"
            onClick={() => router.push(`/cv-form/templates/${cv.cvTemplate}`)}
          >
            CV 1
          </Button>
        );
      })}
    </HomePageArea>
  );
}

// router.push(`/cv-form/templates/template-a`)

const HomePageArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
