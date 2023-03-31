import React, { useState, useEffect } from "react";
import { ResponseData } from "../../pages/api/generate-answer";
import { Button } from "../button";
import styled from "styled-components";
import ReacrScrollableFeed from 'react-scrollable-feed';

export default function Modal() {
  const [modal, setModal] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [aiConversation, setAiConversation] = useState<string[]>([]);

  const askToAi = async (prompt: string) => {
    setAiConversation(aiConversation => [...aiConversation, prompt]);
    await fetch('http://localhost:3000/api/generate-answer', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        prompt: prompt
      })
    }).then((response) => response.json()).then((data) => setAiConversation(aiConversation => [...aiConversation, data.text]));
    setPrompt('');
  };

  const clearConversation = () => setAiConversation([]);

  const toggleModal = () => {
    setModal(!modal);
  };

  if(modal) {
    document.body.classList.add('active-modal')
  } else {
    document.body.classList.remove('active-modal')
  }

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
                <Input type="text" value={prompt} onChange={(e) => { setPrompt(e.target.value) }} placeholder='Write something to George ...' /> 
                <ModalBtn onClick={(e) => {
                  e.preventDefault();
                  askToAi(prompt);
                }}>Go</ModalBtn>
              </Form>
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
              X
            </ModalBtnClose>
          </ModalContent>
        </ModalDiv>
      )}
    </>
  );
}


const ButtonAi = styled.button`
  width : 75px;
  height: 75px;
  position: fixed;
  bottom: 60px;
  right: 30px;
  background: #a0d6fc;
  color: #262a74;
  border-radius: 30%;
  outline: 0;
  border: 0;
  cursor: pointer;

  &:hover {
    background: #262a74;
    color: #a0d6fc;
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
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  line-height: 1.4;
  background: #f1f1f1;
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
  font-weight: 800;
  font-size: large;
  background: #a0d6fc;
  color: #262a74;
  border-radius: 7px;
  outline: 0;
  border: 0;
  cursor: pointer;

  &:hover {
    background: #262a74;
    color: #a0d6fc;
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
`;

const ConversationBox = styled.div`
  width: 90%;
  max-height: 400px;
  margin-bottom: 1rem;
  overflow: scroll;
  padding: 2rem;
  border: 1px solid #262a74;
  border-radius: 7px;
  background: white
`;

const Question = styled.p`
  width: auto;
  padding: 1rem 0 0.5rem 0;
  text-align: end;
  border-bottom: 1px solid rgba(49,49,49,0.8);
  `;
  
  const Answer = styled(Question)`
  text-align: start;
`;

const ClearBtn = styled.button`
  color: #262a74;
  background: none;
  outline: 0;
  border: 0;
  padding: 0.5rem;
  position: absolute;
  bottom: 0;
  right: 10px;
  cursor: pointer;

  &:hover {
    color: #a0d6fc;
  }
`;
