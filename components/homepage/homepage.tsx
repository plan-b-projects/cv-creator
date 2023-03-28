import router from 'next/router';
import styled from 'styled-components';
import { Button } from '../button';

export default function HomePage() {
  return (
    <HomePageArea>
      <Button type="button" onClick={() => router.push('/cv-form')}>
        Create a new CV
      </Button>
      <h2>Your CV</h2>
      <Button
        type="button"
        onClick={() => router.push('/cv-form/templates/template-a')}
      >
        GO TO CV
      </Button>
    </HomePageArea>
  );
}

const HomePageArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
