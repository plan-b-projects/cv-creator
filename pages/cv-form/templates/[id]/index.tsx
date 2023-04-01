import Layout from '../../../../components/layout';
import { useSession } from 'next-auth/react';
import useNoSession from '../../../../helpers/useNoSession';
import TemplateA from '../../../../components/templates/template-a';
import React, { useState } from 'react';
import { PDFExport, savePDF } from '@progress/kendo-react-pdf';

import { Button, ButtonContainer } from '../../../../helpers/button';
import useWindowWidth from '../../../../helpers/useWindowWidth';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import {
  ThemeContainer,
  ThemeButton,
} from '../../../../components/themes/ThemeSwitching.styled';
import { ThemeProvider } from 'styled-components';
import { GlobalStyles } from '../../../../components/themes/Global';
import { Theme } from '../../../../shared-types';
import {
  light,
  dark,
  blue,
  green,
  brown,
  pink,
} from '../../../../components/themes/Theme.styled';
export default function TemplatePage() {
  const router = useRouter();
  const { id } = router.query;
  const { data: session, status } = useSession();
  const pdfExportComponent = React.useRef<PDFExport>(null);
  const container = React.useRef(null);

  const [selectedTheme, setSelectedTheme] = useState(light);
  const HandleThemeChange = (theme: Theme) => {
    setSelectedTheme(theme);
  };

  useNoSession();
  const exportPDFWithComponent = () => {
    if (pdfExportComponent.current) {
      pdfExportComponent.current.save();
    }
  };

  const getFormValues = async () => {
    const response = await fetch('http://localhost:3000/api/users/cv-form', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      const newData = await response.json();
      return newData;
    } else {
      return {};
    }
  };

  const saveCvToUser = async () => {
    const cv = await getFormValues();
    const response = await fetch('http://localhost:3000/api/users/cv-array', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...cv,
        cvTemplate: 'template-a',
      }),
    });
    const status = response.status;
    const data = await response.json();
    return { status, data };
  };

  const width = useWindowWidth();

  return (
    <Layout>
      {session?.user && (
        <>
          <GlobalStyles
            name={''}
            colors={{
              primaryBackground: '',
              secondaryBackground: '',
              primaryTitle: '',
              secondayTitle: '',
              primaryBgTitle: '',
              secondayBgTitle: '',
              primaryText: '',
              secondaryText: '',
              border: '',
            }}
          />
          <TopContainer>
            <ButtonContainer>
              <Button onClick={exportPDFWithComponent}>Download as PFD</Button>

              <Button
                data-testid="save_template"
                onClick={() => saveCvToUser()}
              >
                Save this CV to your profile
              </Button>
            </ButtonContainer>
          </TopContainer>
          <ContentContainer>
            <ThemeProvider theme={selectedTheme}>
              <ThemeContainer>
                <span>Themes: </span>
                <ThemeButton
                  className={`light ${selectedTheme === light ? 'active' : ''}`}
                  onClick={() => HandleThemeChange(light)}
                ></ThemeButton>
                <ThemeButton
                  className={`dark ${selectedTheme === dark ? 'active' : ''}`}
                  onClick={() => HandleThemeChange(dark)}
                ></ThemeButton>
                <ThemeButton
                  className={`blue ${selectedTheme === blue ? 'active' : ''}`}
                  onClick={() => HandleThemeChange(blue)}
                ></ThemeButton>
                <ThemeButton
                  className={`green ${selectedTheme === green ? 'active' : ''}`}
                  onClick={() => HandleThemeChange(green)}
                ></ThemeButton>
                <ThemeButton
                  className={`brown ${selectedTheme === brown ? 'active' : ''}`}
                  onClick={() => HandleThemeChange(brown)}
                ></ThemeButton>
                <ThemeButton
                  className={`pink ${selectedTheme === pink ? 'active' : ''}`}
                  onClick={() => HandleThemeChange(pink)}
                ></ThemeButton>
              </ThemeContainer>

              <PDFExport
                ref={pdfExportComponent}
                paperSize="A4"
                margin={0}
                scale={width > 600 ? 0.999 : 1.99}
                // fileName={`Report for ${new Date().getFullYear()}`}
              >
                <div ref={container}>
                  {id === 'template-a' && <TemplateA />}
                  {id === 'template-b' && <TemplateA />}
                  {id === 'template-c' && <TemplateA />}
                </div>
              </PDFExport>
            </ThemeProvider>
          </ContentContainer>
        </>
      )}
    </Layout>
  );
}
const TopContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const ContentContainer = styled.div`
  margin-bottom: 20px;
`;
