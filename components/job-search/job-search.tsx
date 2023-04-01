import { useForm } from 'react-hook-form';
import { Button } from '../../helpers/button';
import styled, { keyframes } from 'styled-components';
import { useEffect, useState } from 'react';
import Job, { JobData } from './job';

const jobSearchApi = async (query: string) => {
  const url = `https://jsearch.p.rapidapi.com/search?query=${encodeURI(
    query,
  )}&page=1&num_pages=1`;
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '4c8c02ab96msh7a1f3905caf944ep1c95f2jsn9a7e46cb4ad8',
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
      <JobSearchContainer>
        <Label htmlFor="jobSearch">Search for a job: </Label>
        <InputSearchContainer>
          <Input
            type="text"
            {...register('job')}
            placeholder="ex. Python developer in Texas, USA"
          />
          <ButtonGroup>
            <Button type="submit" onClick={submitForm} disabled={isFormLoading}>
              Search for jobs
            </Button>
          </ButtonGroup>
        </InputSearchContainer>
        {isFormLoading ?
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
          :
          null}
      </JobSearchContainer>
      <JobsContainer>
        {jobData.map((job: JobData) => (
          <Job prop={job} isLiked={
            favJobs.find((_job: JobData) => _job.job_id === job.job_id) ? true : false
          } />
        ))}
      </JobsContainer>
    </>
  );
}

const ButtonGroup = styled.div`
  display: flex;
  padding-left: 30px;
  flex-direction: row;
  justify-content: space-between;
`;

const Label = styled.label`
  display: block;
  padding-bottom: 20px;
`;
const Input = styled.input`
  padding: 10px;
  border: 0;
  border-bottom: 1px solid #000;
  width: 100%;
  height: 30px;
`;
export const InputSearchContainer = styled.div`
  display: flex;
  flex-direction: row;
`;
export const JobSearchContainer = styled.div`
  padding-inline: 300px;
  margin-left: 10px;
`;
export const JobsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding-inline: 10px;
  flex-wrap: wrap;
`;
export const Load = styled.div`
  display: flex;
  justify-content: center;
  padding-inline: 10px;
  flex-wrap: wrap;
`;
