import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function useNoSession() {
  const { data: session, status } = useSession();

  const loading = status === 'loading';

  const router = useRouter();
  useEffect(() => {
    if (!session && !loading) {
      router.replace('/');
    }
  });
}
