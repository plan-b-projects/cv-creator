import { useForm } from 'react-hook-form';
import { Button } from '../../helpers/button';
import styled, { keyframes } from 'styled-components';
import { useEffect, useState } from 'react';
import Job, { JobData } from './job';
import { H1, mediaScreen } from '../../helpers/theme';

const jobSearchApi = async (query: string) => {
  const url = `https://jsearch.p.rapidapi.com/search?query=${encodeURI(
    query,
  )}&page=1&num_pages=1`;
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '508255ca30mshe81876e95f737e3p1fa130jsn78d6101ea2c8',
      'X-RapidAPI-Host': 'jsearch.p.rapidapi.com',
    },
  };
  const response = await fetch(url, options);

  if (response.ok) {
    return response.json();
  } else {
    return {};
  }
};

export default function JobSearch() {
  const { register, getValues } = useForm();
  const [jobData, setJobData] = useState([]);
  const [favJobs, setFavJobs] = useState([]);
  const [isFormLoading, setIsFormLoading] = useState(false);

  const submitForm = async () => {
    const patternDigit = /^\d+$/;
    const patternSpace = /^\s*$/;
    if (getValues('job') === '' || patternDigit.test(getValues('job')) || patternSpace.test(getValues('job'))) {
      return
    }
    setIsFormLoading(true);
    const jobValue = getValues('job');
    const res = await jobSearchApi(jobValue);
    setJobData(res.data);
    setIsFormLoading(false);
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

  useEffect(() => {
    getFavJobs();
  }, []);

  return (
    <>
      <H1>Search for a jobs</H1>
      <JobSearchContainer>
        <InputSearchContainer>
          <Input
            type="text"
            {...register('job')}
            placeholder="ex. Python developer in Texas, USA"
          />

          <Button type="submit" onClick={submitForm} disabled={isFormLoading}>
            Search for jobs
          </Button>
        </InputSearchContainer>
        {isFormLoading ? (
          <Load>
            <div className="wrapper">
              <div className="circle"></div>
              <div className="circle"></div>
              <div className="circle"></div>
              <div className="shadow"></div>
              <div className="shadow"></div>
              <div className="shadow"></div>
              <span>Loading</span>
            </div>
          </Load>
        ) : null}
      </JobSearchContainer>
      {
        isFormLoading ?
          null
          :
          <PageWrap>
            <JobsContainer>
              {jobData.map((job: JobData) => (
                <Job
                  data-testid="job_box"
                  prop={job}
                  isLiked={
                    favJobs.find((_job: JobData) => _job.job_id === job.job_id)
                      ? true
                      : false
                  }
                />
              ))}
            </JobsContainer>
          </PageWrap>
      }
    </>
  );
}

export const InputSearchContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  flex-direction: row;

  @media (max-width: ${mediaScreen.small}) {
    flex-direction: column;
    flex: 0 0 260px;
    align-items: stretch;
    margin-inline: 15px;
  }
`;

const Input = styled.input`
  padding: 12px;
  border: 0;
  border-radius: 30px;
  margin-inline: 20px;
  width: 40%;

  @media (max-width: ${mediaScreen.small}) {
    width: 260px;
    margin-inline: 0;
  }
`;

export const JobSearchContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`;

const PageWrap = styled.div`
  display: flex;
  justify-content: center;
`;

export const JobsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin: 20px;
  max-width: 900px;

  @media (max-width: ${mediaScreen.small}) {
    grid-template-columns: 1fr;
  }
`;

export const Load = styled.div`
  display: flex;
  justify-content: center;
  padding-inline: 10px;
  flex-wrap: wrap;
`;
