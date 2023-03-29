import Layout from '../../../components/layout';
import { signOut, useSession } from 'next-auth/react';
import useNoSession from '../../../hooks/useNoSession';
import TemplateA from '../../../components/templates/template-a';
import { useForm } from 'react-hook-form';
import { CvFormValues } from '../../../shared-types';
import React from 'react';

import { PDFExport, savePDF } from '@progress/kendo-react-pdf';
import router from 'next/router';

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
      pdfExportComponent.current.save();
    }
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
              <h2>CHOOSE YOU TEMPLATES</h2>
              <button
                
                type="button"
                onClick={() => router.push('/cv-form/templates/template-a')}
              >
                Template A
              </button>
            </>
          )}
        </div>
    </Layout>
  );
}
