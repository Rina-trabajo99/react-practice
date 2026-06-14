import { useState } from "react";

type Task = {
  id: number;
  name: string;
};

function App() {
  const [taskName, setTaskName] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);

  const [taskNameError, setTaskNameError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChangeTaskName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTaskName(e.target.value);
    setTaskNameError("");
    setSuccessMessage("");
  };

  const handleAddTask = () => {
    if (taskName.trim() === "") {
      setTaskNameError("タスク名を入力してください。");
      setSuccessMessage("");
      return;
    }

    const newTask: Task = {
      id: Date.now(),
      name: taskName.trim(),
    };

    setTasks([...tasks, newTask]);
    setTaskName("");
    setTaskNameError("");
    setSuccessMessage("タスクを追加しました。");
  };

  return (
    <div>
      <h1>学習タスク管理</h1>

      <div>
        <div>
          <label>
            タスク名：
            <input value={taskName} onChange={handleChangeTaskName} />
          </label>

          <button onClick={handleAddTask}>追加</button>
        </div>
        {taskNameError !== "" && <p>{taskNameError}</p>}
      </div>

      <section>
        <h2>タスク一覧</h2>

        <p>
          タスク件数：
          {tasks.length}件
        </p>

        <ul>
          {tasks.map((task) => (
            <li key={task.id}>{task.name}</li>
          ))}
        </ul>
      </section>

      {successMessage !== "" && <p>{successMessage}</p>}
    </div>
  );
}

export default App;
