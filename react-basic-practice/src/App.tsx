import { useState } from "react";

type Task = {
  id: number;
  name: string;
};

function App() {
  const [taskName, setTaskName] = useState("");
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, name: "React useState復習" },
    { id: 2, name: "Java List復習" },
    { id: 3, name: "SQL SELECT練習" },
  ]);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleChangeTaskName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    setTaskName(inputValue);

    //テキストが入力された際にメッセージを空にする
    if (inputValue.trim() !== "") {
      setErrorMsg("");
      setSuccessMsg("");
    }
  };

  const handleAddTask = () => {
    //削除メッセージは何かしらのアクションがあった際は常に空にする
    setSuccessMsg("");

    if (taskName.trim() === "") {
      setErrorMsg("タスクを入力してください。");
      return;
    }

    const newTask: Task = {
      id: Date.now(),
      name: taskName,
    };

    setTasks([...tasks, newTask]);
    setSuccessMsg("タスクを追加しました。");
    setTaskName("");
    setErrorMsg("");
  };

  const handleDeleteTask = (deleteId: number) => {
    const newTasks = tasks.filter((task) => task.id !== deleteId);
    setTasks(newTasks);
    setSuccessMsg("タスクを削除しました。");
  };

  return (
    <div>
      <h1>学習タスク一覧</h1>

      <input
        value={taskName}
        onChange={handleChangeTaskName}
        placeholder="タスク名を入力"
      />
      <button onClick={handleAddTask}>追加</button>
      {errorMsg !== "" && <p>{errorMsg}</p>}

      {tasks.length === 0 && <p>タスクはまだ登録されていません。</p>}
      {tasks.length !== 0 && <p>登録件数：{tasks.length}件</p>}

      {tasks.length > 0 && (
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              {task.name}
              <button onClick={() => handleDeleteTask(task.id)}>削除</button>
            </li>
          ))}
        </ul>
      )}
      {successMsg !== "" && <p>{successMsg}</p>}
    </div>
  );
}

export default App;
