import { useState } from 'react';
import { Education } from './education';

export default function Experience() {
  const [companyMessage, setCompanyMessage] = useState('');
  const [roleMessage, setRoleMessage] = useState('');
  const [durationMessage, setDurationMessage] = useState('');
  const [descriptionMessage, setDescriptionMessage] = useState('');
  const [experience, setExperience] = useState<Education[]>([]);

  const handleCompanyChange = (event: any) => {
    setCompanyMessage(event.target.value);
  };
  const handleRoleChange = (event: any) => {
    setRoleMessage(event.target.value);
  };
  const handleDurationChange = (event: any) => {
    setDurationMessage(event.target.value);
  };
  const handleDescriptionChange = (event: any) => {
    setDescriptionMessage(event.target.value);
  };

  const handleBtnClick = () => {
    setExperience([
      ...experience,
      {
        company: companyMessage,
        role: roleMessage,
        duration: durationMessage,
        description: descriptionMessage,
      },
    ]);
    setCompanyMessage('');
    setRoleMessage('');
    setDurationMessage('');
    setDescriptionMessage('');
  };

  const handleDeleteButtonClick = (index: any) => {
    const removeExperience = experience.filter((_, i) => i !== index);
    setExperience(removeExperience);
  };

  const handleUpdateButtonClick = (index: any) => {
    let updateExperience = experience.filter((_, i) => i === index);
    updateExperience = [
      {
        company: companyMessage,
        role: roleMessage,
        duration: durationMessage,
        description: descriptionMessage,
      },
    ];

    const removeExperience = experience.filter((_, i) => i !== index);
    removeExperience.splice(index, 0, updateExperience[0]);
    setExperience(removeExperience);
  };

  return (
    <div>
      <div>
        <label htmlFor="company">Company name</label>
        <input
          onChange={handleCompanyChange}
          type="text"
          id="company"
          placeholder="Company name"
          value={companyMessage}
          required
        />
        <label htmlFor="role">Role</label>
        <input
          onChange={handleRoleChange}
          type="text"
          id="role"
          placeholder="role"
          value={roleMessage}
          required
        />
        <label htmlFor="duration">Duration</label>
        <input
          onChange={handleDurationChange}
          type="text"
          id="duration"
          placeholder="ex. May 2022 - July 2022"
          value={durationMessage}
          required
        />
        <label htmlFor="description">Description</label>
        <textarea
          onChange={handleDescriptionChange}
          name="description"
          id="description"
          placeholder="description...."
          value={descriptionMessage}
        ></textarea>
        <button
          className="add-experience-button"
          onClick={() => handleBtnClick()}
        >
          Add experience
        </button>
        <div className="d-flex flex-wrap">
          {experience.map((exp, index) => {
            return (
              <div key={exp.role}>
                <p>
                  {exp.role} - {exp.company}
                </p>

                <p>{exp.duration}</p>
                <p>{exp.description}</p>
                <button onClick={() => handleDeleteButtonClick(index)}>
                  Delete
                </button>
                <button onClick={() => handleUpdateButtonClick(index)}>
                  Update
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
