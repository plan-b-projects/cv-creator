import { useEffect, useState } from 'react';
import { CvFormValues } from '../../shared-types';
import styled from 'styled-components';
import { mediaScreen } from '../../helpers/theme';
import { useTemplateSize } from '../../helpers/useTemplateSize';

export default function TemplateB(props: { isInSelector?: boolean }) {
  const [data, setData] = useState<CvFormValues>();
  const templateSize = useTemplateSize(props.isInSelector);

  const getFormValues = async () => {
    const response = await fetch(
      '/api/users/cv-form',
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

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
    <Template style={templateSize} isInSelector={props.isInSelector}>
      <TemplateTop>
        <LeftSection>
          <Name>{data?.basicInfo.name}</Name>
          <UpperText>{data?.basicInfo.location}</UpperText>
          <UpperText>{data?.basicInfo.email}</UpperText>
          <UpperText>{data?.basicInfo.tel}</UpperText>
          <Link href={data?.basicInfo.linkedIn}>LinkedIn</Link>
          <Link href={data?.basicInfo.gitHub}>GitHub</Link>
          <Link href={data?.basicInfo.website}>Website</Link>
        </LeftSection>
        <RightSection>
          <ProfileImage src={data?.basicInfo.profilePicture} />
        </RightSection>
      </TemplateTop>
      <TemplateBottom>
        <TemplateLeft>
          <LeftSection>
            <LeftTitle>TECH SKILLS</LeftTitle>
            <LeftSubtitle>General</LeftSubtitle>
            {data?.skills?.general?.map((general) => {
              return (
                <>
                  <LeftText>{general.name}</LeftText>
                </>
              );
            })}
            <LeftSubtitle>Frontend</LeftSubtitle>
            {data?.skills?.frontend?.map((fe) => {
              return (
                <>
                  <LeftText>{fe.name}</LeftText>
                </>
              );
            })}
            <LeftSubtitle>Backend</LeftSubtitle>
            {data?.skills?.backend?.map((be) => {
              return (
                <>
                  <LeftText>{be.name}</LeftText>
                </>
              );
            })}
            <LeftSubtitle>Tools and technologies</LeftSubtitle>
            {data?.skills?.tools?.map((tool) => {
              return (
                <>
                  <LeftText>{tool.name}</LeftText>
                </>
              );
            })}
          </LeftSection>
          <LeftSection>
            <LeftTitle>LANGUAGES</LeftTitle>
            {data?.languages?.map((lang) => {
              return (
                <>
                  <LeftText>
                    {lang.name} - {lang.fluency}
                  </LeftText>
                </>
              );
            })}
          </LeftSection>
        </TemplateLeft>

        <TemplateRight>
          <RightSection>
            <RightSectionTitle>SUMMARY</RightSectionTitle>
            <RightText>{data?.basicInfo.profileIntro}</RightText>
          </RightSection>
          <RightSection>
            <RightSectionTitle>EDUCATION</RightSectionTitle>
            {data?.education?.map((edu) => {
              return (
                <div>
                  <RightTitle>{edu.course}</RightTitle>
                  <RightSubtitle>
                    {edu.school} - {edu.duration}
                  </RightSubtitle>
                  <RightText>{edu.description}</RightText>
                </div>
              );
            })}
          </RightSection>
          <RightSection className="experience">
            <RightSectionTitle>EXPERIENCE</RightSectionTitle>
            {data?.experience?.map((exp) => {
              return (
                <div>
                  <RightTitle>{exp.job}</RightTitle>
                  <RightSubtitle>
                    {exp.company} - {exp.duration}
                  </RightSubtitle>
                  <RightText>{exp.description}</RightText>
                </div>
              );
            })}
          </RightSection>
        </TemplateRight>
      </TemplateBottom>
    </Template>
  );
}

const Template = styled.div<{ isInSelector?: boolean }>`
  width: ${(props) => (props.isInSelector ? '297.5px' : '595px')};
  height: ${(props) => (props.isInSelector ? '421px' : '842px')};
  font-size: ${(props) => (props.isInSelector ? '9px' : '18px')};
  margin: auto;
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  text-align: left;

  @media (max-width: ${mediaScreen.small}) {
    width: ${(props) => (props.isInSelector ? '198.33px' : '297.5px')};
    height: ${(props) => (props.isInSelector ? '280.67px' : '421px')};
    font-size: ${(props) => (props.isInSelector ? '6px' : '9px')};
  }
`;

const TemplateTop = styled.div`
  max-height: 20%;
  padding: 1em;
  color: ${({ theme }) => theme.colors.primaryTitle};
  background: ${({ theme }) => theme.colors.primaryBackground};
  display: flex;
  justify-content: space-around;
  border-bottom: 1px solid black;
`;

const TemplateBottom = styled.div`
  flex: 0 0 75%;
  max-height: 100%;
  color: ${({ theme }) => theme.colors.primaryTitle};
  background: ${({ theme }) => theme.colors.primaryBackground};
  display: flex;
  flex-direction: row-reverse;
`;

const TemplateLeft = styled.div`
  flex: 0 0 38%;
  max-height: 100%;
  padding: 1em;
  color: ${({ theme }) => theme.colors.secondayTitle};
  background: ${({ theme }) => theme.colors.secondayBgTitle};
  display: flex;
  flex-direction: column;
`;

const ProfileImage = styled.img`
  flex: 0 0 9em;
  width: 9em;
  margin: auto;
  border: 3px solid ${({ theme }) => theme.colors.primaryTitle};
  border-radius: 50%;
`;

const Name = styled.h1`
  font-size: 1.5em;
  padding-bottom: 0.7em;
  border-bottom: 3px solid ${({ theme }) => theme.colors.primaryTitle};
`;

const LeftSection = styled.div`
  padding: 0 0 1.5em 1em;
`;

const LeftTitle = styled.h3`
  font-size: 1em;
  margin: 0.5em 0;
`;

const LeftSubtitle = styled.h4`
  font-size: 0.7em;
  font-weight: 600;
  margin-bottom: 0.3em;
`;

const LeftText = styled.div`
  font-size: 0.7em;
  color: ${({ theme }) => theme.colors.secondaryText};
`;

const UpperText = styled.div`
  font-size: 0.7em;
  color: ${({ theme }) => theme.colors.primaryText};
`;

const Link = styled.a`
  font-size: 0.7em;
  color: ${({ theme }) => theme.colors.primaryText};
  text-decoration: none;
`;

const TemplateRight = styled.div`
  width: 100%;
  padding: 0.5em 1.5rem;
  color: ${({ theme }) => theme.colors.secondayTitle};
  background: ${({ theme }) => theme.colors.secondaryBackground};
  display: flex;
  flex-direction: column;
`;

const RightSection = styled.div``;

const RightSectionTitle = styled.h2`
  margin: 0.5rem 0 0 0;
  padding: 0.5em 1em;
  text-align: center;
  font-size: 1.2em;
`;

const RightTitle = styled.h3`
  margin-bottom: 0.5em;
  font-size: 0.7em;
`;

const RightSubtitle = styled.div`
  font-weight: 600;
  font-size: 0.7em;
`;

const RightText = styled.p`
  padding-bottom: 0.5em;
  font-size: 0.7em;
  margin: 0;
`;
