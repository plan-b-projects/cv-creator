import router from 'next/router';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Button, ButtonSecondary } from '../../helpers/button';
import { H1, H2, H3, colors } from '../../helpers/theme';
import { CvFormValues } from '../../shared-types';
import Job, { JobData } from '../job-search/job';
import { JobsContainer } from '../../components/job-search/job-search';

export default function HomePage() {
  const [cvs, setCvs] = useState<any>([]);
  const [favJobs, setFavJobs] = useState<any>([]);
  const [reloadData, setReloadData] = useState<any>(false);

  const getCvs = async () => {
    const response = await fetch(
      '/api/users/cv-array',
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    if (response.ok) {
      const newData = await response.json();
      setCvs(newData);
    } else {
      setCvs([]);
    }
  };

  const getFavJobs = async () => {
    const response = await fetch(
      '/api/users/job-search',
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    if (response.ok) {
      const newData = await response.json();
      setFavJobs(newData);
    } else {
      setFavJobs([]);
    }
  };

  const setCvForTemplate = async (data: CvFormValues) => {
    const response = await fetch(
      '/api/users/cv-form',
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      },
    );

    return response.ok;
  };

  const deleteCv = async (cv: CvFormValues) => {
    const response = await fetch(
      `/api/users/cv-array/${cv.id}`,
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
            <CvCard key={cv.id}>
              <H3>{cv.cvName}</H3>
              <CvCardButtons>
                <ButtonSecondary
                  type="button"
                  data-textid={cv.cvName}
                  onClick={() => handleClick(cv)}
                >
                  <svg
                    fill={colors.blue}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 384 512"
                    height={20}
                    width={20}
                  >
                    <path d="M0 64C0 28.7 28.7 0 64 0H224V128c0 17.7 14.3 32 32 32H384V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V64zm384 64H256V0L384 128z" />
                  </svg>
                </ButtonSecondary>
                <ButtonSecondary
                  aria-label="Delete CV"
                  type="button"
                  onClick={() => deleteCv(cv)}
                >
                  <svg
                    fill={colors.yellow}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                    height={20}
                    width={20}
                  >
                    <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" />
                  </svg>
                </ButtonSecondary>
              </CvCardButtons>
            </CvCard>
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

const CvCard = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 5px 15px;
  width: 90%;
  margin-bottom: 15px;
  max-width: 600px;
  height: 50px;
  background: ${colors.transparent};
  color: ${colors.light};
  border-radius: 15px;
`;

const CvCardButtons = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
`;
