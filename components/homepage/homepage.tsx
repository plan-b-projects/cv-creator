import router from 'next/router';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Button } from '../../helpers/button';
import { H1, H2 } from '../../helpers/theme';
import { CvFormValues } from '../../shared-types';
import Job, { JobData } from '../job-search/job';
import { JobsContainer } from '../../components/job-search/job-search';

export default function HomePage() {
  const [cvs, setCvs] = useState<any>([]);
  const [favJobs, setFavJobs] = useState<any>([]);
  const [reloadData, setReloadData] = useState<any>(false);

  const getCvs = async () => {
    const response = await fetch('http://localhost:3000/api/users/cv-array', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      const newData = await response.json();
      setCvs(newData);
    } else {
      setCvs([]);
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
      setFavJobs(newData);
    } else {
      setFavJobs([]);
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

  const deleteCv = async (cv: CvFormValues) => {
    const response = await fetch(
      `http://localhost:3000/api/users/cv-array/${cv.id}`,
      {
        method: 'DELETE',
      },
    );

    if (response.ok) {
      setReloadData(!reloadData);
    }
  };

  const handleClick = async (cv: CvFormValues) => {
    setCvForTemplate(cv);
    router.push(`/cv-form/templates/${cv.cvTemplate}`);
  };

  useEffect(() => {
    getCvs();
    getFavJobs();
  }, [reloadData]);

  return (
    <HomePageArea>
      <Button
        type="button"
        data-testid="create_cv"
        onClick={() => router.push('/cv-form')}
      >
        Create a new CV
      </Button>
      {cvs.length > 0 && <H2>Your CVs Collection</H2>}
      {cvs.length > 0 &&
        cvs.map((cv: CvFormValues) => {
          return (
            <CVCard key={cv.id}>
              <Button type="button" data-textid={cv.cvName} onClick={() => handleClick(cv)}>
                {cv.cvName}
              </Button>
              <Button type="button" onClick={() => deleteCv(cv)}>
                <svg
                  height="25"
                  viewBox="0 0 48 48"
                  width="25"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 38c0 2.21 1.79 4 4 4h16c2.21 0 4-1.79 4-4v-24h-24v24zm26-30h-7l-2-2h-10l-2 2h-7v4h28v-4z" />
                  <path d="M0 0h48v48h-48z" fill="none" />
                </svg>
              </Button>
            </CVCard>
          );
        })}
      {favJobs.length > 0 && <H2>Your Saved Job Ads</H2>}
      <JobsContainer>
        {favJobs.length > 0 &&
          favJobs.map((job: JobData) => {
            return (
              <Job
                data-testid="fav_job"
                key={job.job_id}
                prop={job}
                isLiked={true}
                onDeleteFav={() => setReloadData(!reloadData)}
              />
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

const CVCard = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 5px;
  width: 200px;
  height: 50px;
`;
