import { useState } from "react";

function App() {
  const [name, setName] = useState("");
  const [learning, setLearning] = useState("");
  const [goal, setGoal] = useState("");
  const [memo, setMemo] = useState("");

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  const handleChangeLearning = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLearning(e.target.value);
  };
  const handleChangeGoal = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGoal(e.target.value);
  };
  const handleChangeMemo = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMemo(e.target.value);
  };
  const handleReset = () => {
    setName('');
    setLearning('');
    setGoal('');
    setMemo('');
  };

  return (
    <div>
      <h1>プロフィール入力フォーム</h1>

      <div>
        <label>
          名前：
          <input value={name} onChange={handleChangeName} />
        </label>
      </div>

      <div>
        <label>
          学習中の技術：
          <input value={learning} onChange={handleChangeLearning} />
        </label>
      </div>

      <div>
        <label>
          目標：
          <input value={goal} onChange={handleChangeGoal} />
        </label>
      </div>

      <div>
        <label>
          メモ：
          <textarea value={memo} onChange={handleChangeMemo} />
        </label>
      </div>

      <section>
        <h2>入力内容</h2>
        <p>名前：{name}</p>
        <p>学習中の技術：{learning}</p>
        <p>目標：{goal}</p>
        <p>メモ：{memo}</p>
        <p>名前の文字数：{name.length}</p>
      </section>

      <div>
        <button onClick={handleReset}>リセット</button>
      </div>

      <div>
        {name === '' && (
          <p>名前を入力してください。</p>
        )}
      </div>
    </div>
  );
}

export default App;
