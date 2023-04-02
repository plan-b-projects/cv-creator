import React, { useState, useRef } from "react";
import { ResponseData } from "../../pages/api/generate-answer";
import { Button } from "../../helpers/button";
import styled from "styled-components";
import ReacrScrollableFeed from 'react-scrollable-feed';
import { colors } from '../../helpers/theme';

export default function Modal() {
  const [modal, setModal] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [errorVisibility, setErrorVisibility] = useState(false);
  const [aiConversation, setAiConversation] = useState<string[]>([]);
 
  const askToAi = async (prompt: string) => {
    const patternDigit = /^\d+$/;
    const patternSpace = /^\s*$/;
    if (prompt === '' || patternDigit.test(prompt) || patternSpace.test(prompt)) {
      if (errorVisibility === false) {
        setErrorVisibility(!errorVisibility);
      }
      setTimeout(() => {
          setErrorVisibility(false);
        }, 2000);
    } else {
      if (errorVisibility === true) {
        setErrorVisibility(!errorVisibility);
      }
      setAiConversation(aiConversation => [...aiConversation, prompt]);
      await fetch('http://localhost:3000/api/generate-answer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          prompt: prompt
        })
      }).then((response) => response.json())
        .then((data) => setAiConversation(aiConversation => [...aiConversation, data.text]))
        .catch(error => {
          console.log('ERROR FROM CHATGPT: ' + error);
          setAiConversation(aiConversation => [...aiConversation, 'Sorry. I am not feeling well. I will be back soon.'])
        });
    }
    setPrompt('');
  };

  const clearConversation = () => setAiConversation([]);

  const toggleModal = () => {
    setModal(!modal);
  };

    return (
    <>
      <ButtonAi onClick={toggleModal}>
        Ask Ceve
      </ButtonAi>
      {modal && (
        <ModalDiv>
          <Overlay onClick={toggleModal} />
            <ModalContent>
              <h2>Hello! My name is Ceve.</h2>
              <h3>How can I help you?</h3>
              <Form>
                <Input type="text" value={prompt} onChange={(e) => { setPrompt(e.target.value) }} placeholder='Write something to Ceve...' /> 
                <ModalBtn onClick={(e) => {
                  e.preventDefault();
                  askToAi(prompt);
                }}>Go</ModalBtn>
              </Form>
              {
                errorVisibility === true ?
                  <ErrorBox>Sorry, try to write something else.</ErrorBox>
                  :
                  null
              }
              <ConversationBox>
              <ReacrScrollableFeed>
                {
                aiConversation.length === 0 ?
                  '...'
                  : 
                    aiConversation.map((text, index) => {
                    if (index%2 !== 0) {
                      return <Answer>{text}</Answer>
                    } 
                    return <Question>{text}</Question>
                  })
                  }
                </ReacrScrollableFeed>
                <ClearBtn onClick={clearConversation}>Clear conversation</ClearBtn>
              </ConversationBox>
            <ModalBtnClose className="close-modal" onClick={toggleModal}>
              x
            </ModalBtnClose>
          </ModalContent>
        </ModalDiv>
      )}
    </>
  );
}


const ButtonAi = styled(Button)`
  position: fixed;
  bottom: 60px;
  right: 30px;
  background: ${colors.yellow};
  
  &:hover {
    color: ${colors.yellow};
  }
`;

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
  background: rgba(49,49,49,0.8);
  cursor: pointer;
`;

const ModalContent = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  line-height: 1.4;
  background: ${colors.dark};
  color: ${colors.light};
  padding: 18px 28px;
  border-radius: 14px;
  max-width: 600px;
  min-width: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media (min-width: 400px) {
    min-width: 30vw;
  }
`;

const Form = styled.form`
  width: 100%;
  margin-bottom: 2rem;
  display: flex;
  justify-content: center;
`;

const ModalBtn = styled.button`
  padding: 0 1rem;
  font-weight: 400;
  font-size: large;
  background: ${colors.yellow};
  color: ${colors.dark};
  border-radius: 7px;
  outline: 0;
  border: 0;
  cursor: pointer;

  &:hover {
    background: ${colors.dark};
    color: ${colors.yellow};
  }
`;

const ModalBtnClose = styled(ModalBtn)`
  padding: 0.5rem;
  position: absolute;
  top: 10px;
  right: 10px;
`;

const Input = styled.input`
  width: 100%;
  padding: 1rem;
  margin-right: 1rem;
  border-radius: 7px;
  background: ${colors.transparent};
  color: ${colors.light};
  border: 0;
`;

const ErrorBox = styled.div`
  width: 65%;
  position: absolute;
  color: red;
  top:210px;
  left:35px;
`;

const ConversationBox = styled.div`
  width: 90%;
  max-height: 400px;
  margin-bottom: 1rem;
  overflow: scroll;
  padding: 1rem;
  border: 1px solid #262a74;
  border-radius: 7px;
  background: ${colors.transparent};
`;

const Question = styled.p`
  width: auto;
  padding: 1rem 0 0.5rem 0;
  text-align: end;
  border-bottom: 1px solid ${colors.yellow};
  `;
  
  const Answer = styled(Question)`
  text-align: start;
`;

const ClearBtn = styled.button`
  color: #262a74;
  background: none;
  color: ${colors.light};
  outline: 0;
  border: 0;
  padding: 0.5rem;
  position: absolute;
  bottom: 0;
  right: 10px;
  cursor: pointer;

  &:hover {
    color: ${colors.yellow};
  }
`;
