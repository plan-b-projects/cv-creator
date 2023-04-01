import React, { useState } from 'react';
import { useMeasuredHeight } from '../../helpers/useMeasuredHeight';
import { FieldGroup } from './field-group';
import {
  Fieldset,
  Legend,
  FieldsetContent,
  MeasuringWrapper,
} from './form-styles';

export default function BasicInfo() {
  const [isExpanded, setIsExpanded] = useState(false);
  const { measuringWrapperRef, measuredHeight } = useMeasuredHeight();
  const height = isExpanded ? measuredHeight : 0;

  return (
    <Fieldset>
      <Legend
        isExpanded={isExpanded}
        data-testid="basic_info"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        Basic Info
      </Legend>

      <FieldsetContent height={height}>
        <MeasuringWrapper ref={measuringWrapperRef}>
          <FieldGroup
            name="basicInfo.profilePicture"
            label="Profile Picture"
            placeholder="https://example.com/example.jpg"
            inputType="url"
          />

          <FieldGroup
            name="basicInfo.name"
            data-testid="name"
            label="Name"
            placeholder="John Doe"
          />

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
        </MeasuringWrapper>
      </FieldsetContent>
    </Fieldset>
  );
}
