import Layout from '../../../../components/layout';
import { signOut, useSession } from 'next-auth/react';
import styles from '../../../../components/header/header.module.css';
import useNoSession from '../../../../hooks/useNoSession';
import TemplateA from '../../../../components/templates/template-a';
import React from 'react';
import { PDFExport, savePDF } from '@progress/kendo-react-pdf';
import LogInChip from '../../../../components/log-in-chip';
import { Button } from '../../../../components/button';
import styled from 'styled-components';

export default function FormPage() {
  const { data: session, status } = useSession();
  const pdfExportComponent = React.useRef<any>(null);
  const container = React.useRef(null);

  useNoSession();
  const exportPDFWithComponent = () => {
    if (pdfExportComponent.current) {
      console.log(pdfExportComponent);

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

  return (
    <Layout>
      <Container>
        <TopPart_Container>
          <ButtonContainer>
            <Button onClick={exportPDFWithComponent}>Download cv as pdf</Button>
            <Button onClick={() => saveCvToUser()}>
              Save this CV to your profile
            </Button>
          </ButtonContainer>
          <div>
            <LogInChip />
          </div>
        </TopPart_Container>
        {session?.user && (
          <>
            <PDFExport
              ref={pdfExportComponent}
              paperSize="auto"
              margin={40}
              fileName={`Report for ${new Date().getFullYear()}`}
              author="KendoReact Team"
            >
              <div ref={container}>
                <TemplateA />
              </div>
            </PDFExport>
          </>
        )}
      </Container>
    </Layout>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const TopPart_Container = styled.div`
  width: 70%;
  margin: 2rem auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ButtonContainer = styled.div`
  display: flex;
  width: 30%;
  justify-content: space-between;
`;
