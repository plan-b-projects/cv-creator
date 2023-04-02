import { useRef, useState } from 'react';
import styled from 'styled-components';

export type JobData = {
  employer_name: string;
  employer_company_type: string;
  job_publisher: string;
  job_employment_type: string;
  job_title: string;
  job_apply_link: string;
  job_description: string;
  job_is_remote: boolean;
  job_city: string;
  job_country: string;
  job_id: string;
};

type JobType = {
  prop: JobData;
  isLiked?: boolean;
  onDeleteFav?: () => void;
};

export default function Job({
  prop,
  isLiked = false,
  onDeleteFav = () => {},
}: JobType) {
  console.log(prop);

  const [fav, setFave] = useState(isLiked);
  const ref = useRef<HTMLDivElement>(null);

  const addFav = () => {
    fetch(`http://localhost:3000/api/users/job-search`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        job: prop,
      }),
    }).then(() => setFave(true));
  };

  const deleteFav = () => {
    fetch(`http://localhost:3000/api/users/job-search/${prop.job_id}`, {
      method: 'DELETE',
    })
      .then(() => setFave(false))
      .then(onDeleteFav);
  };

  const handleClick = () => {
    if (!fav) {
      addFav();
    } else {
      deleteFav();
    }
  };

  return (
    <JobContainer key={prop.job_id}>
      <h1>{prop.job_title}</h1>
      <h4>employer name: {prop.employer_name}</h4>
      <p>
        location: {prop.job_city}, {prop.job_country}
      </p>
      <p>
        {prop.job_employment_type} - {prop.job_is_remote ? 'remote' : 'on-site'}
      </p>
      <FavLinkContainer>
        <a href={prop.job_apply_link} target="_blank">
          Apply link
        </a>
        <FavButton data-testid="fav_job" onClick={() => handleClick()}>
          {fav ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path d="M12 4.248c-3.148-5.402-12-3.825-12 2.944 0 4.661 5.571 9.427 12 15.808 6.43-6.381 12-11.147 12-15.808 0-6.792-8.875-8.306-12-2.944z" />
            </svg>
          ) : (
            <svg
              width="24"
              height="24"
              xmlns="http://www.w3.org/2000/svg"
              fill-rule="evenodd"
              clip-rule="evenodd"
            >
              <path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402m5.726-20.583c-2.203 0-4.446 1.042-5.726 3.238-1.285-2.206-3.522-3.248-5.719-3.248-3.183 0-6.281 2.187-6.281 6.191 0 4.661 5.571 9.429 12 15.809 6.43-6.38 12-11.148 12-15.809 0-4.011-3.095-6.181-6.274-6.181" />
            </svg>
          )}
        </FavButton>
      </FavLinkContainer>
    </JobContainer>
  );
}

const JobContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 30px;
  border: 1px solid #262a74;
  padding: 10px;
  min-width: 25%;
  background-color: white;
`;
const FavLinkContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 5px;
`;
const FavButton = styled.button`
  border: 1px solid #262a74;
  background-color: white;
  padding: 5px;
`;
