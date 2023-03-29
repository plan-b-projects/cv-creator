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

  const exportPDFWithMethod = () => {
    let element = container.current || document.body;
    savePDF(element, {
      paperSize: 'auto',
      margin: 40,
      fileName: `cv for ${new Date().getFullYear()}`,
    });
  };
  const loading = status === 'loading';

  useNoSession();
  const exportPDFWithComponent = () => {
    if (pdfExportComponent.current) {
      console.log(pdfExportComponent);

      pdfExportComponent.current.save();
    }
  };

  return (
    <Layout>
      <Container>
        <TopPart_Container>
          <div>
            <Button
              onClick={exportPDFWithComponent}
            >
              Download cv as pdf
            </Button>
          </div>
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
                  <TemplateA userEmail={session?.user.email} />
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
`
