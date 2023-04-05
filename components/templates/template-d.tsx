import { useEffect, useState } from 'react';
import { CvFormValues } from '../../shared-types';
import styled from 'styled-components';
import { mediaScreen } from '../../helpers/theme';
import { useTemplateSize } from '../../helpers/useTemplateSize';

export default function TemplateD(props: { isInSelector?: boolean }) {
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
        <Name>{data?.basicInfo.name}</Name>
        <ImageBox>
          {
            data?.basicInfo.profilePicture ?
            <ProfileImage src={data?.basicInfo.profilePicture} />
              :
            <ProfileImage src='https://marketplace.canva.com/EAFEits4-uw/1/0/1600w/canva-boy-cartoon-gamer-animated-twitch-profile-photo-oEqs2yqaL8s.jpg'></ProfileImage>  
          }
        </ImageBox>
        <LeftTopSection>
          <LeftTitle>CONTACT</LeftTitle>
          <LeftText>{data?.basicInfo.location}</LeftText>
          <LeftText>{data?.basicInfo.email}</LeftText>
          <LeftText>{data?.basicInfo.tel}</LeftText>
          <Link href={data?.basicInfo.linkedIn}>LinkedIn</Link>
          <Link href={data?.basicInfo.gitHub}>GitHub</Link>
          <Link href={data?.basicInfo.website}>Website</Link>
        </LeftTopSection>
      </TemplateTop>
      <TemplateBottom>
        <UpperSection>
          <RightSection>
            <Summary>SUMMARY</Summary>
            <Text>{data?.basicInfo.profileIntro}</Text>
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
                  <Text>{edu.description}</Text>
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
                  <Text>{exp.description}</Text>
                </div>
              );
            })}
          </RightSection>
        </UpperSection>
        <BottomSection>
          <TechSection>
            <LeftTitle>TECH SKILLS</LeftTitle>
            <TechBox>
              <div>
                <LeftSubtitle>Frontend</LeftSubtitle>
                {data?.skills?.frontend?.map((fe) => {
                  return (
                    <>
                      <LeftText>{fe.name}</LeftText>
                    </>
                  );
                })}
              </div>

              <div>
                <LeftSubtitle>Backend</LeftSubtitle>
                {data?.skills?.backend?.map((be) => {
                  return (
                    <>
                      <LeftText>{be.name}</LeftText>
                    </>
                  );
                })}
              </div>
              <div>
                <LeftSubtitle>General</LeftSubtitle>
                {data?.skills?.general?.map((general) => {
                  return (
                    <>
                      <LeftText>{general.name}</LeftText>
                    </>
                  );
                })}
              </div>
              <div>
                <LeftSubtitle>Tools and technologies</LeftSubtitle>
                {data?.skills?.tools?.map((tool) => {
                  return (
                    <>
                      <LeftText>{tool.name}</LeftText>
                    </>
                  );
                })}
              </div>
            </TechBox>
          </TechSection>
          <div>
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
          </div>
        </BottomSection>
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

  color: ${({ theme }) =>
    theme.name !== 'dark'
      ? theme.colors.secondaryText
      : theme.colors.secondaryBackground};
  background: ${({ theme }) =>
    theme.name !== 'dark'
      ? theme.colors.secondaryBackground
      : theme.colors.primaryBackground};

  @media (max-width: ${mediaScreen.small}) {
    width: ${(props) => (props.isInSelector ? '198.33px' : '297.5px')};
    height: ${(props) => (props.isInSelector ? '280.67px' : '421px')};
    font-size: ${(props) => (props.isInSelector ? '6px' : '9px')};
  }
`;

const TemplateTop = styled.div`
  max-height: 20%;
  padding: 1em;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TemplateBottom = styled.div`
  flex: 0 0 75%;
  max-height: 100%;
  display: flex;
  flex-direction: column;
`;

const BottomSection = styled.div`
  max-height: 100%;
  padding: 0 3em;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const ImageBox = styled.div`
  width: 6em;
  height: 6em;
  align-self: center;
`;

const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  margin: auto;
  border: 3px solid ${({ theme }) => theme.colors.primaryTitle};
  border-radius: 50%;
`;

const Name = styled.span`
  color: ${({ theme }) =>
    theme.name !== 'dark'
      ? theme.colors.primaryBackground
      : theme.colors.secondaryBackground};
  color: ${({ theme }) =>
    theme.name === 'light' ? theme.colors.secondaryText : null};
  width: 30%;
  font-size: 1.5em;
  text-align: center;
`;

const LeftTopSection = styled.div``;

const LeftTitle = styled.h3`
  color: ${({ theme }) =>
    theme.name !== 'dark'
      ? theme.colors.primaryBackground
      : theme.colors.secondaryBackground};
  color: ${({ theme }) =>
    theme.name === 'light' ? theme.colors.secondaryText : null};
  font-size: 1em;
  margin: 0.5em 0;
`;

const LeftSubtitle = styled.h4`
  font-size: 0.7em;
  font-weight: 600;
  margin: 0;
`;

const LeftText = styled.div`
  font-size: 0.7em;
`;

const Link = styled.a`
  font-size: 0.7em;
  color: ${({ theme }) =>
    theme.name !== 'dark'
      ? theme.colors.secondaryText
      : theme.colors.secondaryBackground};
  text-decoration: none;
`;

const UpperSection = styled.div`
  padding: 0.5em;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const RightSection = styled.div``;

const RightSectionTitle = styled.h2`
  color: ${({ theme }) =>
    theme.name !== 'dark'
      ? theme.colors.primaryBackground
      : theme.colors.secondaryBackground};
  color: ${({ theme }) =>
    theme.name === 'light' ? theme.colors.secondaryText : null};
  margin: 0.5rem 0 0 0;
  font-size: 1.2em;
  text-align: center;
`;

const Summary = styled(RightSectionTitle)`
  margin-bottom: 0.8rem;
`;

const RightTitle = styled.h3`
  margin-bottom: 0.5em;
  padding: 0 3rem;
  font-size: 0.7em;
`;

const RightSubtitle = styled.div`
  font-weight: 600;
  padding: 0 3rem;
  font-size: 0.7em;
`;

const Text = styled.p`
  padding: 0 3rem 0.5rem;
  font-size: 0.7em;
  margin: 0;
`;

const TechBox = styled.div`
  display: flex;
  justify-content: space-between;
`;

const TechSection = styled.div`
  width: 100%;
`;
