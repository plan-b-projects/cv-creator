import { ReactNode, useEffect, useState } from 'react';
import { CvFormValues } from '../../shared-types';

export default function TemplateA() {
  const [data, setData] = useState<CvFormValues>();

  const getFormValues = async () => {
    const response = await fetch('http://localhost:3000/api/users/cv-form', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      const newData = await response.json();
      return setData(newData);
    } else {
      return {};
    }
  };

  useEffect(() => {
    getFormValues();
  }, []);

  return (
    <>
      <div className="basicInfo">
        <img src={data?.basicInfo.profilePicture} />
        <div className="name">{data?.basicInfo.name}</div>
        <div className="profileIntro">{data?.basicInfo.profileIntro}</div>
        <div className="location">{data?.basicInfo.location}</div>
        <div className="email">{data?.basicInfo.email}</div>
        <div className="tel">{data?.basicInfo.tel}</div>
        <div className="linkedIn">
          <a href={data?.basicInfo.linkedIn}>LinkedIn</a>
        </div>
        <div className="github">
          <a href={data?.basicInfo.gitHub}>GitHub</a>
        </div>
        <div className="github">
          <a href={data?.basicInfo.website}>Website</a>
        </div>
      </div>
      <div className="education">
        {data?.education?.map((edu) => {
          return (
            <div>
              <h3>{edu.course}</h3>
              <h3>{edu.school}</h3>
              <h2>{edu.duration}</h2>
              <p>{edu.description}</p>
            </div>
          );
        })}
      </div>
      <div className="experience">
        {data?.experience?.map((exp) => {
          return (
            <div>
              <h3>{exp.job}</h3>
              <h3>{exp.company}</h3>
              <h2>{exp.duration}</h2>
              <p>{exp.description}</p>
            </div>
          );
        })}
      </div>
      <div className="skills">
        <div className="general">
          {data?.skills?.general?.map((general) => {
            return (
              <div>
                <h3>{general.name}</h3>
              </div>
            );
          })}
        </div>
        <div className="frontend">
          {data?.skills?.frontend?.map((fe) => {
            return (
              <div>
                <h3>{fe.name}</h3>
              </div>
            );
          })}
        </div>
        <div className="backend">
          {data?.skills?.backend?.map((be) => {
            return (
              <div>
                <h3>{be.name}</h3>
              </div>
            );
          })}
        </div>
        <div className="tools">
          {data?.skills?.tools?.map((tool) => {
            return (
              <div>
                <h3>{tool.name}</h3>
              </div>
            );
          })}
        </div>
      </div>
      <div className="language">
        {data?.languages?.map((lang) => {
          return (
            <div>
              <h3>{lang.name}</h3>
              <h3>{lang.fluency}</h3>
            </div>
          );
        })}
      </div>
    </>
  );
}
