import { useState } from "react";

function App() {
  const [name, setName] = useState('');

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  return (
    <div>
      <h1>input練習</h1>

      <input value={name} onChange={handleChangeName} />

      {name && <p>入力された名前：{name}</p>}
    </div>
  );
}

export default App;