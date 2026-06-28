import { useState } from "react";
import "./App.css";

type BookItem = {
  id: number;
  title: string;
  genre: string;
};

function App() {
  //ステートの定義
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [bookLists, setBookLists] = useState<BookItem[]>([
    { id: 1, title: "Java入門", genre: "技術書" },
    { id: 2, title: "React実践", genre: "技術書" },
    { id: 3, title: "英語多読", genre: "語学" },
  ]);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  //追加ボタン押下時の処理
  const handleAddBook = () => {
    setSuccessMsg("");

    if (title.trim() === "") {
      setErrorMsg("本のタイトルを入力してください。");
      return;
    }
    if (genre.trim() === "") {
      setErrorMsg("ジャンルを入力してください。");
      return;
    }

    const newItem = {
      id: Date.now(),
      title: title.trim(),
      genre: genre.trim(),
    };

    setBookLists([...bookLists, newItem]);
    setTitle("");
    setGenre("");
    setErrorMsg("");
    setSuccessMsg("登録しました。");
  };

  //個別削除ボタン押下時の処理
  const handleDeleteBook = (deleteId: number) => {
    const newBookLists = bookLists.filter(
      (bookItem) => bookItem.id !== deleteId,
    );
    const newSelectedItems = selectedItems.filter((id) => id !== deleteId);
    setBookLists(newBookLists);
    setSelectedItems(newSelectedItems);
    setErrorMsg("");
    setSuccessMsg("削除しました。");
  };

  //チェックボックスのチェック切り替え処理
  const handleToggleSelect = (targetId: number) => {
    if (selectedItems.includes(targetId)) {
      const newSelectedItems = selectedItems.filter((id) => id !== targetId);
      setSelectedItems(newSelectedItems);
    } else {
      setSelectedItems([...selectedItems, targetId]);
    }
  };

  //複数選択削除処理
  const handleDeleteSelected = () => {
    setSuccessMsg("");

    if (selectedItems.length === 0) {
      setErrorMsg("削除する本を選択してください。");
      return;
    }

    const newBookLists = bookLists.filter(
      (item) => !selectedItems.includes(item.id),
    );
    setBookLists(newBookLists);
    setSelectedItems([]);
    setErrorMsg("");
    setSuccessMsg("選択した本を削除しました。");
  };

  //全選択処理
  const handleSelectAll = () => {
    setSelectedItems(bookLists.map((item) => item.id));
    setErrorMsg("");
    setSuccessMsg("");
  };

  //全解除処理
  const handleClearSelect = () => {
    setSelectedItems([]);
    setErrorMsg("");
    setSuccessMsg("");
  };

  return (
    <div className="app">
      <h1>読みたい本リスト管理</h1>

      <section className="form-section">
        <div className="form-row">
          <label className="form-label">本のタイトル：</label>
          <input
            type="text"
            className="form-input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="本のタイトルを入力してください。"
          />
        </div>
        <div className="form-row">
          <label className="form-label">ジャンル：</label>
          <input
            type="text"
            className="form-input"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            placeholder="ジャンルを入力してください。"
          />
        </div>
        <button className="add-button" onClick={handleAddBook}>
          リストに追加する
        </button>
      </section>

      <section className="message-section">
        {errorMsg !== "" && <p className="error-message">{errorMsg}</p>}
        {successMsg !== "" && <p className="success-message">{successMsg}</p>}
      </section>

      <section className="list-section">
        <div>
          {selectedItems.length === 0 ? (
            <p className="selected-item-status">選択されていません。</p>
          ) : (
            <p className="selected-item-status">
              選択中：{selectedItems.length}件
            </p>
          )}
        </div>
        <div>
          <button
            className="select-button"
            onClick={handleDeleteSelected}
            disabled={selectedItems.length === 0}
          >
            選択した本を削除
          </button>
          <button
            className="select-button button-space"
            onClick={handleSelectAll}
          >
            全選択
          </button>
          <button className="select-button" onClick={handleClearSelect}>
            全解除
          </button>
        </div>
        {bookLists.length === 0 ? (
          <p className="empty-message">読みたい本はまだ登録されていません。</p>
        ) : (
          <div>
            <h2 className="list-header">読みたい本リスト</h2>
            <ul className="item-list">
              {bookLists.map((item, index) => (
                <li className="item-row" key={item.id}>
                  <div className="item-main">
                    <input
                      type="checkbox"
                      checked={selectedItems.includes(item.id)}
                      onChange={() => handleToggleSelect(item.id)}
                    />
                    <span>
                      {index + 1}. {item.title} / {item.genre}
                    </span>
                  </div>
                  <button
                    className="delete-button"
                    onClick={() => handleDeleteBook(item.id)}
                  >
                    削除
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>
    </div>
  );
}

export default App;
