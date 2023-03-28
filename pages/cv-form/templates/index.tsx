import Layout from '../../../components/layout';
import { signOut, useSession } from 'next-auth/react';
import styles from '../../../components/header/header.module.css';
import Form from '../../../components/cv-form/form';
import useNoSession from '../../../hooks/useNoSession';
import TemplateA from '../../../components/templates/template-a';
import { useForm } from 'react-hook-form';
import { CvFormValues } from '../../../shared-types';
import React from 'react';

import { PDFExport, savePDF } from "@progress/kendo-react-pdf";
import router from "next/router"


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
            <div className={styles.signedInStatus}>
                <div
                    className={`nojs-show ${!session && loading ? styles.loading : styles.loaded
                        }`}
                >
                    {session?.user && (
                        <>
                            <div>
                                <div>
                                    {session.user.image && (
                                        <span
                                            style={{
                                                backgroundImage: `url('${session.user.image}')`,
                                            }}
                                            className={styles.avatar}
                                        />
                                    )}
                                    <span className={styles.signedInText}>
                                        <small>Signed in as</small>
                                        <br />
                                        <strong>{session.user.email ?? session.user.name}</strong>
                                    </span>
                                    <a
                                        href={`/api/auth/signout`}
                                        className={styles.button}
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
                            <button className={styles.cvButton} type="button" onClick={() => router.push('/cv-form/templates/template-a')}>
                                Template A
                            </button>
                        </>
                    )}
                </div>
              </PDFExport>
              <button
                className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base"
                onClick={exportPDFWithComponent}
              >
                Download cv as pdf
              </button>
            </>
          )}
        </div>
      </div>
    </Layout>
  );
}
