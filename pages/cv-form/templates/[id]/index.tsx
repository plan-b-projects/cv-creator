import Layout from '../../../../components/layout';
import { useSession } from 'next-auth/react';
import useNoSession from '../../../../helpers/useNoSession';
import TemplateA from '../../../../components/templates/template-a';
import React from 'react';
import { PDFExport } from '@progress/kendo-react-pdf';
import LogInChip from '../../../../components/log-in-chip';
import { Button, ButtonContainer } from '../../../../helpers/button';
import useWindowWidth from '../../../../helpers/useWindowWidth';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { mediaScreen } from '../../../../helpers/theme';

export default function TemplatePage() {
  const router = useRouter();
  const { id } = router.query;
  const { data: session, status } = useSession();
  const pdfExportComponent = React.useRef<PDFExport>(null);
  const container = React.useRef(null);

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
    const response = await fetch('http://localhost:3000/api/users/cv-form', {
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
          <TopContainer>
            <ButtonContainer>
              <Button onClick={exportPDFWithComponent}>Download as PFD</Button>
              <Button onClick={() => saveCvToUser()}>
                Save this CV to your profile
              </Button>
            </ButtonContainer>
          </TopContainer>
          <ContentContainer>
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
