import React, { useState, useRef } from 'react';
import { ResponseData } from '../../pages/api/generate-answer';
import { Button } from '../../helpers/button';
import styled from 'styled-components';
import ReacrScrollableFeed from 'react-scrollable-feed';
import { useRouter } from 'next/router';
import { v4 as uuidv4 } from 'uuid';
import { colors, mediaScreen } from '../../helpers/theme';

export default function CvNameModal() {
  const [modal, setModal] = useState(false);
  const [prompt, setPrompt] = useState('');
  const router = useRouter();

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
        id: uuidv4(),
        cvTemplate: router.query.id,
        cvName: prompt ? prompt : 'Unnamed CV',
      }),
    });
    const status = response.status;
    const data = await response.json();
    toggleModal();
    router.push('/');
    return { status, data };
  };

  const toggleModal = () => {
    setModal(!modal);
  };

  return (
    <>
      <Button data-testid="save_template" onClick={toggleModal}>
        Save this CV to your profile
      </Button>
      {modal && (
        <ModalDiv>
          <Overlay onClick={toggleModal} />
          <ModalContent>
            <h2>Save your CV as:</h2>
            <Form>
              <Input
                type="text"
                data-testid="name_cv"
                value={prompt}
                onChange={(e) => {
                  setPrompt(e.target.value);
                }}
                placeholder="My first CV"
              />
              <ModalBtn
                disabled={prompt === ''}
                onClick={(e) => {
                  e.preventDefault();
                  saveCvToUser();
                }}
              >
                Save CV
              </ModalBtn>
            </Form>
            <ModalBtnClose className="close-modal" onClick={toggleModal}>
              X
            </ModalBtnClose>
          </ModalContent>
        </ModalDiv>
      )}
    </>
  );
}

const ModalDiv = styled.div`
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: fixed;
`;

const Overlay = styled(ModalDiv)`
  background: rgba(49, 49, 49, 0.8);
  cursor: pointer;
`;

const ModalContent = styled.div`
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  line-height: 1.4;
  background: ${colors.dark};
  color: ${colors.light};
  padding: 18px 28px;
  border-radius: 14px;
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  
  @media (min-width: ${mediaScreen.small}) {
    max-width: 500px;
  }
  `;
  
  const Form = styled.form`
  width: 100%;
  margin-bottom: 2rem;
  display: flex;
  justify-content: center;
  gap: 15px;
  flex-direction: column;
  
  @media (min-width: ${mediaScreen.small}) {
    flex-direction: row;
  }
  
`;

const ModalBtn = styled(Button)`
`;

const ModalBtnClose = styled(ModalBtn)`
  padding: 0.5rem;
  position: absolute;
  top: 10px;
  right: 10px;
`;

export const Input = styled.input`
  border: 0;
  padding: 10px;
  padding-right: 0;
  background-color: ${colors.transparent};
  color: ${colors.light};
  border-radius: 15px;
  font-size: 15px;
  flex: 1;
`;