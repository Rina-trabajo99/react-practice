import { useState } from "react";

type StudyTask = {
  id: number;
  title: string;
  category: string;
};

function App() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [tasks, setTasks] = useState<StudyTask[]>([
    { id: 1, title: "React復習", category: "React" },
    { id: 2, title: "Java復習", category: "Java" },
  ]);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleAddTask = () => {
    if (title.trim() === "") {
      setErrorMsg("学習内容が入力されていません。");
      return;
    }
    if (category.trim() === "") {
      setErrorMsg("カテゴリが入力されていません。");
      return;
    }

    const newTask: StudyTask = {
      id: Date.now(),
      title,
      category,
    };

    setTasks([...tasks, newTask]);
    setTitle("");
    setCategory("");
    setErrorMsg("");
    setSuccessMsg("タスクを追加しました。");
  };

  const handleDeleteTask = (deleteId: number) => {
    const newTasks = tasks.filter((task) => task.id !== deleteId);
    setTasks(newTasks);
    setSuccessMsg("タスクを削除しました。");
  };

  return (
    <div>
      <h1>学習タスク一覧</h1>
      <section>
        <label>学習内容</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="学習内容を入力してください。"
        />
      </section>
      <section>
        <label>カテゴリ</label>
        <input
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="カテゴリを入力してください。"
        />
      </section>
      {errorMsg !== "" && <p>{errorMsg}</p>}
      <button onClick={handleAddTask} style={{marginBottom: "10px"}}>追加</button>

      {tasks.length === 0 ? (
        <p>タスクはまだ登録されていません。</p>
      ) : (
        <>
          <h2>タスク一覧</h2>
          <ul>
            {tasks.map((task) => (
              <li key={task.id}>
                {task.title}/{task.category}
                <button onClick={() => handleDeleteTask(task.id)}>削除</button>
              </li>
            ))}
          </ul>
          {successMsg !== "" && <p>{successMsg}</p>}
        </>
      )}
    </div>
  );
}

export default App;
