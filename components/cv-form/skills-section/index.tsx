import SkillsInput from './skills-input';

export default function SkillsForm() {
  return (
    <fieldset>
      <legend>Skills</legend>
      <SkillsInput skillLabel="Frontend" skillType="frontend" />
      <SkillsInput skillLabel="Backend" skillType="backend" />
      <SkillsInput skillLabel="Tools and technologies" skillType="tools" />
      <SkillsInput skillLabel="General" skillType="general" />
    </fieldset>
  );
}
