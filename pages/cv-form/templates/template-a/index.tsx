import Layout from '../../../../components/layout';
import { signOut, useSession } from 'next-auth/react';
import useNoSession from '../../../../hooks/useNoSession';
import TemplateA from '../../../../components/templates/template-a';
import React from 'react';
import { PDFExport, savePDF } from '@progress/kendo-react-pdf';

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
      <div>
        {session?.user && (
          <>
            <div>
              <div>
                {session.user.image && (
                  <span
                    style={{
                      backgroundImage: `url('${session.user.image}')`,
                    }}
                  />
                )}
                <span>
                  <small>Signed in as</small>
                  <br />
                  <strong>{session.user.email ?? session.user.name}</strong>
                </span>
                <a
                  href={`/api/auth/signout`}
                  onClick={(e) => {
                    e.preventDefault();
                    signOut();
                  }}
                >
                  Sign out
                </a>
              </div>
            </div>
            <div>Templates</div>
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
            <button
              className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base"
              onClick={exportPDFWithComponent}
            >
              Download cv as pdf
            </button>
            <button
              className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base"
              onClick={() => saveCvToUser()}
            >
              Save this CV to your profile
            </button>
          </>
        )}
      </div>
    </Layout>
  );
}
