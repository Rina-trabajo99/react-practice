import { useState } from "react";
import "./App.css";

type StudyLog = {
  id: number;
  title: string;
  category: string;
  minutes: number;
};

function App() {
  //登録用テキスト欄用
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [minutes, setMinutes] = useState(""); //NOTE: String型で受け取った後、number型に変換する

  //検索欄用テキスト欄用
  const [searchTitle, setSearchTitle] = useState("");
  const [searchCategory, setSearchCategory] = useState("");
  const [searchMinutes, setSearchMinutes] = useState("");

  //表示メッセージ用
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  //学習ログ一覧初期設定
  const [studyLogs, setStudyLogs] = useState<StudyLog[]>([
    { id: 1, title: "Java List", category: "Java", minutes: 45 },
    { id: 2, title: "SQL CASE", category: "SQL", minutes: 60 },
    { id: 3, title: "React filter", category: "React", minutes: 90 },
  ]);

  //追加ボタン処理
  const handleAddLog = () => {
    setSuccessMsg("");

    if (title.trim() === "") {
      setErrorMsg("学習内容を入力してください。");
      return;
    }
    if (category.trim() === "") {
      setErrorMsg("カテゴリを入力してください。");
      return;
    }
    if (minutes.trim() === "") {
      setErrorMsg("学習時間を入力してください。");
      return;
    }

    //string → number
    const numberMinutes = Number(minutes);

    // NOTE: number型に変換できなかった値はNaN(Not a Number)となる
    if (Number.isNaN(numberMinutes)) {
      setErrorMsg("学習時間は半角数値で入力してください。（登録欄）");
      return;
    }
    if (numberMinutes <= 0) {
      setErrorMsg("学習時間は1分以上の値を入力してください。（登録欄）");
      return;
    }

    //add to StudyLogs
    const newLog: StudyLog = {
      id: Date.now(),
      title: title.trim(),
      category: category.trim(),
      minutes: numberMinutes,
    };
    setStudyLogs([...studyLogs, newLog]);

    setTitle("");
    setCategory("");
    setMinutes("");
    setErrorMsg("");
    setSuccessMsg("登録しました。");
  };

  //検索用学習時間の値の代入
  const handleSearchMinutesChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setSuccessMsg("");

    //NOTE: 画面表示に変化を出さないために、trim()を使用せずに代入する
    const inputValue = e.target.value;
    setSearchMinutes(inputValue);

    const trimmedValue = inputValue.trim();
    const numberMinutes = Number(trimmedValue);

    if (trimmedValue !== "" && Number.isNaN(numberMinutes)) {
      setErrorMsg("学習時間検索は半角数値で入力してください。");
    } else {
      setErrorMsg("");
    }
  };

  //検索に一致するリストの作成
  const filteredLogs = studyLogs.filter((log) => {
    //冗長的な記述を避けるため、内部ステートを設定
    const trimmedTitle = searchTitle.trim();
    const trimmedCategory = searchCategory.trim();
    const trimmedMinutes = searchMinutes.trim();

    const isTitleMatch =
      trimmedTitle === "" ||
      log.title.toLowerCase().includes(trimmedTitle.toLowerCase());
    const isCategoryMatch =
      trimmedCategory === "" ||
      log.category.toLowerCase().includes(trimmedCategory.toLowerCase());

    const numberMinutes = Number(trimmedMinutes);

    const isMinutesMatch =
      trimmedMinutes === "" ||
      (!Number.isNaN(numberMinutes) && log.minutes >= numberMinutes);

    return isTitleMatch && isCategoryMatch && isMinutesMatch;
  });

  //検索中か判定する true: 検索中、false: 検索中でない
  const isSearching =
    searchTitle.trim() !== "" ||
    searchCategory.trim() !== "" ||
    searchMinutes.trim() !== "";

  //検索クリア処理
  const handleClearSearch = () => {
    setSearchTitle("");
    setSearchCategory("");
    setSearchMinutes("");
    setErrorMsg("");
    setSuccessMsg("");
  };

  //学習時間の評価処理
  const handleSetStatus = (targetMinutes: number) => {
    if (targetMinutes >= 60) {
      return "長い";
    } else if (targetMinutes >= 30) {
      return "普通";
    }
    return "短い";
  };

  //ログ一覧リストの個別削除
  const handleDeleteLog = (deleteId: number) => {
    setStudyLogs(studyLogs.filter((log) => log.id !== deleteId));
    setErrorMsg("");
    setSuccessMsg("削除しました。");
  };

  return (
    <div>
      <section className="header-area">
        <h1>学習ログ検索アプリ</h1>
        <div>
          {errorMsg !== "" && <p className="error-message">{errorMsg}</p>}
          {successMsg !== "" && <p className="success-message">{successMsg}</p>}
        </div>
      </section>

      <section className="section-card">
        <h2>ログの登録</h2>
        <div>
          <label htmlFor="title">学習内容：</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="学習内容を入力してください。"
          />
        </div>
        <div>
          <label htmlFor="category">カテゴリ：</label>
          <input
            type="text"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="カテゴリを入力してください。"
          />
        </div>
        <div>
          <label htmlFor="minutes">学習時間：</label>
          <input
            type="text"
            id="minutes"
            value={minutes}
            onChange={(e) => setMinutes(e.target.value)}
            placeholder="学習時間を入力してください。"
          />
        </div>
        <button
          disabled={
            title.trim() === "" ||
            category.trim() === "" ||
            minutes.trim() === ""
          }
          onClick={handleAddLog}
        >
          追加
        </button>
      </section>

      <section className="section-card">
        <h2>検索条件</h2>
        {isSearching && <p>検索中です。</p>}
        <div>
          <label htmlFor="searchTitle">タイトル検索：</label>
          <input
            type="text"
            id="searchTitle"
            value={searchTitle}
            onChange={(e) => setSearchTitle(e.target.value)}
            placeholder="検索するタイトルを入力してください。"
          />
        </div>
        <div>
          <label htmlFor="searchCategory">カテゴリ検索：</label>
          <input
            type="text"
            id="searchCategory"
            value={searchCategory}
            onChange={(e) => setSearchCategory(e.target.value)}
            placeholder="検索するカテゴリを入力してください。"
          />
        </div>
        <div>
          <span className="searchMinutes-area">
            <label htmlFor="searchMinutes">学習時間：</label>
            <input
              type="text"
              id="searchMinutes"
              value={searchMinutes}
              onChange={handleSearchMinutesChange}
              placeholder="検索する学習時間を入力してください。"
            />
            <p>分以上</p>
          </span>
        </div>
        <button disabled={!isSearching} onClick={handleClearSearch}>
          検索条件をクリア
        </button>
      </section>

      <section className="section-card">
        <h2>学習ログ一覧</h2>
        <p className="logs-count">
          表示件数：{filteredLogs.length}件 / 全{studyLogs.length}件
        </p>
        {studyLogs.length === 0 ? (
          <p>学習ログはまだ登録されていません。</p>
        ) : filteredLogs.length === 0 ? (
          <p>検索条件に一致する学習ログがありません。</p>
        ) : (
          <ul>
            {filteredLogs.map((log, index) => (
              <li className="logs-row" key={log.id}>
                <span className="row-contents">
                  {index + 1}. {log.title} / {log.category} / {log.minutes}分 /
                  {" " + handleSetStatus(log.minutes)}
                </span>
                <button
                  className="delete-button"
                  onClick={() => handleDeleteLog(log.id)}
                >
                  削除
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

export default App;
