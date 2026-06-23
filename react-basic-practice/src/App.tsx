import { useState } from "react";
import "./App.css";

type ProductItems = {
  id: number;
  name: string;
  category: string;
};

function App() {
  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("");
  const [items, setItems] = useState<ProductItems[]>([
    { id: 1, name: "卵", category: "食品" },
    { id: 2, name: "洗剤", category: "日用品" },
  ]);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleAddItem = () => {
    setSuccessMsg("");

    if (productName.trim() === "") {
      setErrorMsg("商品名が入力されていません。");
      return;
    }

    if (category.trim() === "") {
      setErrorMsg("カテゴリが入力されていません。");
      return;
    }

    const newItem: ProductItems = {
      id: Date.now(),
      name: productName,
      category,
    };

    setItems([...items, newItem]);
    setProductName("");
    setCategory("");
    setErrorMsg("");
    setSuccessMsg("追加しました。");
  };

  const handleDeleteItem = (deleteId: number) => {
    const newItems = items.filter((item) => item.id !== deleteId);
    setItems(newItems);
    setErrorMsg("");
    setSuccessMsg("削除しました。");
  };

  return (
    <div className="app">
      <h1>買い物メモ管理</h1>

      <section className="form-section">
        <div className="form-row">
          <label className="form-label">商品名：</label>
          <input
            className="form-input"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            placeholder="商品名を入力してください。"
          />
        </div>
        <div className="form-row">
          <label className="form-label">カテゴリ：</label>
          <input
            className="form-input"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="カテゴリを入力してください。"
          />
        </div>
        <button className="add-button" onClick={handleAddItem}>
          追加
        </button>
      </section>

      <section className="message-section">
        {errorMsg !== "" && <p className="error-message">{errorMsg}</p>}
        {successMsg !== "" && <p className="success-message">{successMsg}</p>}
      </section>

      <section className="list-section">
        <h2>買い物リスト</h2>
        {items.length == 0 ? (
          <p>登録されているリストがありません。</p>
        ) : (
          <ul className="item-list">
            {items.map((item, index) => (
              <li className="item-row" key={item.id}>
                <span>
                  {index + 1}. {item.name} / {item.category}
                </span>
                <button
                  className="delete-button"
                  onClick={() => handleDeleteItem(item.id)}
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
