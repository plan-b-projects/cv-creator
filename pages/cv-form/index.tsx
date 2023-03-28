import Layout from '../../components/layout';
import { signOut, useSession } from 'next-auth/react';
import Form from '../../components/cv-form/form';
import useNoSession from '../../hooks/useNoSession';
import styled from 'styled-components';
import LogInChip from '../../components/log-in-chip';

export default function FormPage() {
  const { data: session, status } = useSession();

  const loading = status === 'loading';

  useNoSession();

  return (
    <Layout>
      <div>
        <LogInChip />
        {session?.user && (
            <Form />
        )}
      </div>
    </Layout>
  );
}

