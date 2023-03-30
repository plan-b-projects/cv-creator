import { FieldValues, FormProvider, useForm, useFormContext } from 'react-hook-form';
import { useRouter } from 'next/router';
import { Button } from '../button';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import Job, { JobData } from './job';


const jobSearchApi = async (query: string) => {
    const url = `https://jsearch.p.rapidapi.com/search?query=${encodeURI(query)}&page=1&num_pages=1`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '4c8c02ab96msh7a1f3905caf944ep1c95f2jsn9a7e46cb4ad8',
            'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
        }
    };
    const response = await fetch(url, options);

    if (response.ok) {
        return response.json();
    }
    else {
        return {}
    }
};

export default function JobSearch() {
    const { register, getValues } = useForm();
    const [jobData, setJobData] = useState([]);

    const router = useRouter();

    const submitForm = async () => {
        const jobValue = getValues('job');
        const res = await jobSearchApi(jobValue);
        setJobData(res.data);
    };

    return (
        <><JobSearchContainer>
            <Label htmlFor='jobSearch'>Search for a job: </Label>
            <Input type='text' {...register('job')} placeholder='ex. Python developer in Texas, USA' /><ButtonGroup>
                <Button
                    type="submit"
                    onClick={submitForm}
                >
                    Search for jobs
                </Button>
            </ButtonGroup>
        </JobSearchContainer>
            <JobsContainer>
                {jobData.map((job: any) =>
                    <Job prop={job} />
                )}

            </JobsContainer></>
    );
}

const FormContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`;

const StyledForm = styled.form`
  padding: 10px;
  width: 780px;
  flex-direction: column;
  align-items
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
export const JobSearchContainer = styled.div`
  margin: 10px;
  padding-inline: 300px;
  margin-left: 10px
`;
export const JobsContainer = styled.div`
display: flex;
flex-direction: row;
justify-content: center;
margin: 30px;
padding-inline: 10px;
flex-wrap: wrap;
`;