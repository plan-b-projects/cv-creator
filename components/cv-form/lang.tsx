import { useState } from 'react';
export type Lang = {
    language: string,
    fluency:string
}
export default function Languages() {

  const [langMessage, setLangMessage] = useState('');
  const [flueMessage, setFlueMessage] = useState('');
  const [lang, setLang] = useState<Lang[]>([]);

  const handleLangChange = (event: any) => {
    setLangMessage(event.target.value);
  };
  const handleFlueChange = (event: any) => {
    setFlueMessage(event.target.value);
  };

  const handleBtnClick = () => {
    setLang([...lang, {language: langMessage, fluency: flueMessage}]);
    setLangMessage('');
    setFlueMessage('');

  };



  return (
    <div>
      <div>
        <label htmlFor="language">Language</label>
        <input
          onChange={handleLangChange}
          type="text"
          id="language"
          placeholder="language"
          value={langMessage}
          required
        />
        <label htmlFor="fluency">Fluency</label>
        <input
          onChange={handleFlueChange}
          type="text"
          id="fluency"
          placeholder="fluency"
          value={flueMessage}
          required
        />
        <button
          className="add-skill-button"
          onClick={() => handleBtnClick()}
        >
          Add language and fluency
        </button>
        <div className="d-flex flex-wrap">
          {lang.map((lang) => {
            return <p key={lang.language}>{lang.language} - {lang.fluency}</p>;
          })}
        </div>
      </div>
    </div>
  );
}
