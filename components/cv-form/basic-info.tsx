import React, { useState } from 'react';
import styled from 'styled-components';
import { FieldGroup } from './field-group';

export default function BasicInfo() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Fieldset>
      <Legend
        isExpanded={isExpanded}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        Basic Info
      </Legend>

      <FieldsetContent isExpanded={isExpanded}>
        <FieldGroup
          name="basicInfo.profilePicture"
          label="Profile Picture"
          placeholder="https://example.com/example.jpg"
          inputType="url"
        />

        <FieldGroup name="basicInfo.name" label="Name" placeholder="John Doe" />

        <FieldGroup
          name="basicInfo.profileIntro"
          label="Introduction"
          placeholder="Write a short description about yourself..."
          inputType="textarea"
        />

        <FieldGroup
          name="basicInfo.location"
          label="Location"
          placeholder="Stockholm, Sweden"
        />

        <FieldGroup
          name="basicInfo.email"
          label="Email"
          placeholder="johndoe@email.com"
          inputType="email"
        />

        <FieldGroup
          name="basicInfo.tel"
          label="Tel"
          placeholder="0712345678"
          inputType="tel"
        />

        <FieldGroup
          name="basicInfo.linkedIn"
          label="LinkedIn"
          placeholder="https://www.linkedin.com/in/johndoe/"
          inputType="url"
        />

        <FieldGroup
          name="basicInfo.gitHub"
          label="GitHub"
          placeholder="https://www.github.com/johndoe/"
          inputType="url"
        />

        <FieldGroup
          name="basicInfo.website"
          label="Other website"
          placeholder="https://www.johndoe.com"
          inputType="url"
        />
      </FieldsetContent>
    </Fieldset>
  );
}

const FieldsetContent = styled.div<{ isExpanded: boolean }>`
  display: ${(props) => (props.isExpanded ? 'block' : 'none')};
`;

const Fieldset = styled.fieldset`
  border: none;
  padding: 0;
  margin: 20px 0;
`;
const Legend = styled.legend<{ isExpanded: boolean }>`
  border-radius: 2px;
  background-color: #a0d6fc;
  width: 97%;
  padding: 15px 0;
  padding-left: 20px;
  font-weight: ${(props) => (props.isExpanded ? '700' : '400')};
`;
