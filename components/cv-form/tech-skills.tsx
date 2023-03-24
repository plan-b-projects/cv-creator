import { useState } from 'react';

export default function Skills() {
  const [frontendMessage, setFrontendMessage] = useState('');
  const [backendMessage, setBackendMessage] = useState('');
  const [techandtoolMessage, setTechAndToolMessage] = useState('');
  const [generalMessage, setGeneralMessage] = useState('');
  const [generalSkills, setGeneralSkills] = useState<string[]>([]);
  const [frontendSkills, setFrontendSkills] = useState<string[]>([]);
  const [backendSkills, setBackendSkills] = useState<string[]>([]);
  const [techAndToolskills, setTechAndToolSkills] = useState<string[]>([]);

  const handleFrontendChange = (event: any) => {
    setFrontendMessage(event.target.value);
  };
  const handleBackendChange = (event: any) => {
    setBackendMessage(event.target.value);
  };
  const handleTechAndToolChange = (event: any) => {
    setTechAndToolMessage(event.target.value);
  };
  const handleGeneralChange = (event: any) => {
    setGeneralMessage(event.target.value);
  };

  const handleFrontEndBtnClick = () => {
    setFrontendSkills([...frontendSkills, frontendMessage]);
    setFrontendMessage('');
  };
  const handleBackEndBtnClick = () => {
    setBackendSkills([...backendSkills, backendMessage]);
    setBackendMessage('');
  };
  const handleTechAndToolsBtnClick = () => {
    setTechAndToolSkills([...techAndToolskills, techandtoolMessage]);
    setTechAndToolMessage('');
  };
  const handleGeneralBtnClick = () => {
    setGeneralSkills([...generalSkills, generalMessage]);
    setGeneralMessage('');
  };

  return (
    <div>
      <div>
        <label htmlFor="skill">Frontend</label>
        <input
          onChange={handleFrontendChange}
          type="text"
          id="skill"
          placeholder="skill"
          value={frontendMessage}
          required
        />
        <button
          className="add-skill-button"
          onClick={() => handleFrontEndBtnClick()}
        >
          Add skill
        </button>
        <div className="d-flex flex-wrap">
          {frontendSkills.map((skill) => {
            return <p key={skill}>{skill}</p>;
          })}
        </div>
      </div>
      <div>
        <label htmlFor="skill">Backend</label>
        <input
          onChange={handleBackendChange}
          type="text"
          id="skill"
          placeholder="skill"
          value={backendMessage}
          required
        />
        <button
          className="add-skill-button"
          onClick={() => handleBackEndBtnClick()}
        >
          Add skill
        </button>
        <div className="d-flex flex-wrap">
          {backendSkills.map((skill) => {
            return <p key={skill}>{skill}</p>;
          })}
        </div>
      </div>
      <div>
        <label htmlFor="skill">Tools and technologies</label>
        <input
          onChange={handleTechAndToolChange}
          type="text"
          id="skill"
          placeholder="skill"
          value={techandtoolMessage}
          required
        />
        <button
          className="add-skill-button"
          onClick={() => handleTechAndToolsBtnClick()}
        >
          Add skill
        </button>
        <div className="d-flex flex-wrap">
          {techAndToolskills.map((skill) => {
            return <p key={skill}>{skill}</p>;
          })}
        </div>
      </div>
      <div>
        <label htmlFor="skill">General</label>
        <input
          onChange={handleGeneralChange}
          type="text"
          id="skill"
          placeholder="skill"
          value={generalMessage}
          required
        />
        <button
          className="add-skill-button"
          onClick={() => handleGeneralBtnClick()}
        >
          Add skill
        </button>
        <div className="d-flex flex-wrap">
          {generalSkills.map((skill) => {
            return <p key={skill}>{skill}</p>;
          })}
        </div>
      </div>
    </div>
  );
}
