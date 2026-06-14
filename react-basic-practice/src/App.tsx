import { useState } from "react";
import "./App.css";

function App() {
  const [name, setName] = useState("");
  const [learning, setLearning] = useState("");
  const [goal, setGoal] = useState("");

  const [nameError, setNameError] = useState("");
  const [learningError, setLearningError] = useState("");
  const [goalError, setGoalError] = useState("");

  const [successMessage, setSuccessMessage] = useState("");

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    setSuccessMessage("");

    if (e.target.value.trim() !== "") {
      setNameError("");
    }
  };

  const handleChangeLearning = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLearning(e.target.value);
    setSuccessMessage("");

    if (e.target.value.trim() !== "") {
      setLearningError("");
    }
  };

  const handleChangeGoal = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGoal(e.target.value);
    setSuccessMessage("");

    if (e.target.value.trim() !== "") {
      setGoalError("");
    }
  };

  const handleSubmit = () => {
    let hasError = false;

    if (name.trim() === "") {
      setNameError("名前を入力してください。");
      hasError = true;
    } else {
      setNameError("");
    }

    if (learning.trim() === "") {
      setLearningError("学習中の技術を入力してください。");
      hasError = true;
    } else {
      setLearningError("");
    }

    if (goal.trim() === "") {
      setGoalError("目標を入力してください。");
      hasError = true;
    } else {
      setGoalError("");
    }

    if (hasError) {
      setSuccessMessage("");
      return;
    }

    setSuccessMessage("送信しました。");
  };

  const handleReset = () => {
    setName("");
    setLearning("");
    setGoal("");

    setNameError("");
    setLearningError("");
    setGoalError("");

    setSuccessMessage("");
  };

  return (
    <div>
      <h1>プロフィール入力チェック</h1>

      <div className="textboxArea">
        <div>
          <label>
            名前：
            <input value={name} onChange={handleChangeName} />
          </label>
          {nameError !== "" && <p className="fail">{nameError}</p>}
        </div>

        <div style={{ marginTop: "15px" }}>
          <label>
            学習中の技術：
            <input value={learning} onChange={handleChangeLearning} />
          </label>
          {learningError !== "" && <p className="fail">{learningError}</p>}
        </div>

        <div style={{ marginTop: "15px" }}>
          <label>
            目標：
            <input value={goal} onChange={handleChangeGoal} />
          </label>
          {goalError !== "" && <p className="fail">{goalError}</p>}
        </div>
      </div>

      <button className="button" onClick={handleSubmit}>
        送信
      </button>
      <button className="button" onClick={handleReset}>
        リセット
      </button>

      {successMessage !== "" && <p className="success">{successMessage}</p>}
    </div>
  );
}

export default App;
