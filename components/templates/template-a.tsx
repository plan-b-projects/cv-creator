import { ReactNode, useEffect, useState } from 'react';
import { CvFormValues } from '../../shared-types';
import { saveTemplateToCv } from '../../db/db';
import styled from 'styled-components';

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
    <Template>
      <TemplateLeft>
        <TemplateLeft__image src={data?.basicInfo.profilePicture} />
        <TemplateLeft__name className="name">
          {data?.basicInfo.name}
        </TemplateLeft__name>
        <TemplateLeft__section className="skills">
          <TemplateLeft__title>TECH SKILLS</TemplateLeft__title>
          <div className="general">
            <TemplateLeft__subtitle>General</TemplateLeft__subtitle>
            {data?.skills?.general?.map((general) => {
              return (
                <>
                  <TemplateLeft__text>{general.name}</TemplateLeft__text>
                </>
              );
            })}
          </div>
          <div className="frontend">
            <TemplateLeft__subtitle>Frontend</TemplateLeft__subtitle>
            {data?.skills?.frontend?.map((fe) => {
              return (
                <>
                  <TemplateLeft__text>{fe.name}</TemplateLeft__text>
                </>
              );
            })}
          </div>
          <div className="backend">
            <TemplateLeft__subtitle>Backend</TemplateLeft__subtitle>
            {data?.skills?.backend?.map((be) => {
              return (
                <>
                  <TemplateLeft__text>{be.name}</TemplateLeft__text>
                </>
              );
            })}
          </div>
          <div className="tools">
            <TemplateLeft__subtitle>
              Tools and technologies
            </TemplateLeft__subtitle>
            {data?.skills?.tools?.map((tool) => {
              return (
                <>
                  <TemplateLeft__text>{tool.name}</TemplateLeft__text>
                </>
              );
            })}
          </div>
        </TemplateLeft__section>
        <TemplateLeft__section className="language">
          <TemplateLeft__title>LANGUAGES</TemplateLeft__title>
          {data?.languages?.map((lang) => {
            return (
              <>
                <TemplateLeft__text>
                  {lang.name} - {lang.fluency}
                </TemplateLeft__text>
              </>
            );
          })}
        </TemplateLeft__section>
        <TemplateLeft__section>
          <TemplateLeft__title>CONTACT</TemplateLeft__title>
          <TemplateLeft__text className="location">
            {data?.basicInfo.location}
          </TemplateLeft__text>
          <TemplateLeft__text className="email">
            {data?.basicInfo.email}
          </TemplateLeft__text>
          <TemplateLeft__text className="tel">
            {data?.basicInfo.tel}
          </TemplateLeft__text>
          <div className="linkedIn">
            <TemplateLeft__link href={data?.basicInfo.linkedIn}>
              LinkedIn
            </TemplateLeft__link>
          </div>
          <div className="github">
            <TemplateLeft__link href={data?.basicInfo.gitHub}>
              GitHub
            </TemplateLeft__link>
          </div>
          <div className="website">
            <TemplateLeft__link href={data?.basicInfo.website}>
              Website
            </TemplateLeft__link>
          </div>
        </TemplateLeft__section>
      </TemplateLeft>
      <TemplateRight>
        <TemplateRight__section>
          <TemplateRight__sectionTitle>SUMMARY</TemplateRight__sectionTitle>
          <TemplateRight__text className="profileIntro">
            {data?.basicInfo.profileIntro}
          </TemplateRight__text>
        </TemplateRight__section>
        <TemplateRight__section className="education">
          <TemplateRight__sectionTitle>EDUCATION</TemplateRight__sectionTitle>
          {data?.education?.map((edu) => {
            return (
              <div>
                <TemplateRight__title>{edu.course}</TemplateRight__title>
                <TemplateRight__subtitle>
                  {edu.school} - {edu.duration}
                </TemplateRight__subtitle>
                <TemplateRight__text>{edu.description}</TemplateRight__text>
              </div>
            );
          })}
        </TemplateRight__section>
        <TemplateRight__section className="experience">
          <TemplateRight__sectionTitle>EXPERIENCE</TemplateRight__sectionTitle>
          {data?.experience?.map((exp) => {
            return (
              <div>
                <TemplateRight__title>{exp.job}</TemplateRight__title>
                <TemplateRight__subtitle>
                  {exp.company} - {exp.duration}
                </TemplateRight__subtitle>
                <TemplateRight__text>{exp.description}</TemplateRight__text>
              </div>
            );
          })}
        </TemplateRight__section>
      </TemplateRight>
    </Template>
  );
}

{
  /* 
<button
  className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base"
    onClick={() => postTemplateToInfo()}
  >
  Save as complete CV
</button> 
*/
}

const Template = styled.div`
  width: 70%;
  margin: auto;
  border: 1px solid black;
  display: flex;
`;

const TemplateLeft = styled.div`
  width: 40%;
  padding: 2rem;
  color: ${({ theme }) => theme.colors.primaryTitle};
  background: ${({ theme }) => theme.colors.primaryBackground};
  display: flex;
  flex-direction: column;
`;

const TemplateLeft__image = styled.img`
  width: 150px;
  height: 150px;
  margin: auto;
  border: 3px solid ${({ theme }) => theme.colors.primaryTitle};
  border-radius: 50%;
`;

const TemplateLeft__name = styled.h1`
  padding: 1rem 0;
  margin-bottom: 2rem;
  border-bottom: 3px solid ${({ theme }) => theme.colors.primaryTitle};
`;

const TemplateLeft__section = styled.div`
  padding-bottom: 1rem;
`;

const TemplateLeft__title = styled.h3`
  margin: 0.5rem 0;
`;

const TemplateLeft__subtitle = styled.h4`
  margin-bottom: 0.5rem;
  font-weight: 600;
`;

const TemplateLeft__text = styled.div`
  color: ${({ theme }) => theme.colors.primaryText};
`;

const TemplateLeft__link = styled.a`
  color: ${({ theme }) => theme.colors.primaryText};
  text-decoration: none;
`;

const TemplateRight = styled.div`
  width: 60%;
  padding: 2rem;
  color: ${({ theme }) => theme.colors.secondayTitle};
  background: ${({ theme }) => theme.colors.secondaryBackground};
  display: flex;
  flex-direction: column;
`;

const TemplateRight__sectionTitle = styled.h2`
  padding: 0.5rem 1rem;
  text-align: center;
  background: ${({ theme }) => theme.colors.secondayBgTitle};
`;

const TemplateRight__section = styled.div``;

const TemplateRight__title = styled.h3`
  margin-bottom: 0.5rem;
`;

const TemplateRight__subtitle = styled.div`
  font-weight: 600;
`;

const TemplateRight__text = styled.p`
  padding-bottom: 0.5rem;
  margin: 0;
`;
