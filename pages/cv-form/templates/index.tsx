import Layout from '../../../components/layout';
import { useSession } from 'next-auth/react';
import useNoSession from '../../../helpers/useNoSession';
import TemplateA from '../../../components/templates/template-a';
import TemplateB from '../../../components/templates/template-b';
import TemplateC from '../../../components/templates/template-c';
import TemplateD from '../../../components/templates/template-d';
import React from 'react';
import router from 'next/router';
import { Button, ButtonContainer } from '../../../helpers/button';
import styled, { ThemeProvider } from 'styled-components';
import { colors, H1, mediaScreen } from '../../../helpers/theme';
import { dark } from '../../../components/themes/Theme.styled';

export default function FormPage() {
  const { data: session, status } = useSession();
  const templates = [
    {
      name: 'template-a',
      component: <TemplateA isInSelector />,
    },
    {
      name: 'template-b',
      component: <TemplateB isInSelector />,
    },
    {
      name: 'template-c',
      component: <TemplateC isInSelector />,
    },
    {
      name: 'template-d',
      component: <TemplateD isInSelector />,
    },
  ];

  useNoSession();

  return (
    <Layout>
      <div>
        {session?.user && (
          <PageContainer>
            <H1>Select CV TEMPLATES</H1>
            <ContentContainer>
              <ThemeProvider theme={dark}>
                {templates.map((template) => (
                  <TemplateSelector>
                    <TemplateBtn
                      type="button"
                      onClick={() =>
                        router.push(`/cv-form/templates/${template.name}`)
                      }
                    >
                      {template.component}
                      <SelectButton
                        type="button"
                        data-testid={template.name.replace('-', '_')}
                        onClick={() =>
                          router.push(`/cv-form/templates/${template.name}`)
                        }
                      >
                        Select This Template
                      </SelectButton>
                    </TemplateBtn>
                  </TemplateSelector>
                ))}
              </ThemeProvider>
            </ContentContainer>
          </PageContainer>
        )}
      </div>
    </Layout>
  );
}

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  flex-direction: column;
  width: 100%;
  margin: 0 15px;
  justify-content: center;
  
  @media (min-width: ${mediaScreen.small}) {
    flex-direction: row;
    justify-content: space-evenly;
    width: 80%;
  }
`;

const TemplateSelector = styled.div`
  margin: 30px;

  @media (max-width: ${mediaScreen.small}) {
    margin: 15px;
  }
`;

const TemplateBtn = styled.button`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  padding: 10px;
  padding-bottom: 0;
  border: none;
  border-radius: 10px;
  background-color: ${colors.transparent};
`;

const SelectButton = styled(Button)`
  margin: 15px 0;
`;
