import router from 'next/router';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Button } from '../../helpers/button';
import { H1, H2 } from '../../helpers/theme';
import { CvFormValues } from '../../shared-types';
import Job, { JobData } from '../job-search/job';
import { JobsContainer } from '../../components/job-search/job-search'

export default function HomePage() {
  const [cvs, setCvs] = useState<any>([]);
  const [favJobs, setFavJobs] = useState<any>([]);

  const getCvs = async () => {
    const response = await fetch('http://localhost:3000/api/users/cv-array', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      const newData = await response.json();
      if (newData.length > 0) {
        return setCvs(newData);
      } else {
        return;
      }
    } else {
      return {};
    }
  };

  const getFavJobs = async () => {
    const response = await fetch('http://localhost:3000/api/users/job-search', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      const newData = await response.json();
      if (newData.length > 0) {
        return setFavJobs(newData);
      } else {
        return;
      }
    } else {
      return {};
    }
  };

  const setCvForTemplate = async (data: CvFormValues) => {
    const response = await fetch('http://localhost:3000/api/users/cv-form', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    return response.ok;
  };

  const handleClick = async (cv: CvFormValues) => {
    setCvForTemplate(cv);
    router.push(`/cv-form/templates/${cv.cvTemplate}`);
  };

  useEffect(() => {
    getCvs();
    getFavJobs();
  }, []);


  return (
    <HomePageArea>
      <Button type="button" onClick={() => router.push('/cv-form')}>
        Create a new CV
      </Button>
      {cvs.length > 0 && <H2>Your CVs Collection</H2>}
      {cvs.length > 0 &&
        cvs.map((cv: CvFormValues) => {
          return (
            <Button type="button" onClick={() => handleClick(cv)}>
              CV {cvs.indexOf(cv) + 1}
            </Button>
          );
        })}
      {favJobs.length > 0 && <H2>Your Saved Job Ads</H2>}
      <JobsContainer>
        {favJobs.length > 0 &&
          favJobs.map((job: JobData) => {
            return (
              <Job prop={job} />
            );
          })}
      </JobsContainer>

    </HomePageArea>
  );
}

const HomePageArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
