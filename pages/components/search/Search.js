import React from "react";
import styles from "./Search.module.css";

function Search() {
  return (
    <form className="bg-main px-12 py-12 w-1/2 rounded">
      <h2 className="text-xl mb-8 text-white text-center">小説を検索する</h2>
      <div className="flex gap-4 min-w-full mx-auto">
        <select
          className={`color-dark-gray px-5 py-3 w-full rounded ${styles.select}`}
          name=""
        >
          <option disabled="disabled" value="0">
            ジャンルを絞る
          </option>
          <option value="">すべて</option>
          <option value="1">恋愛</option>
          <option value="2">ファンタジー</option>
          <option value="3">文芸</option>
          <option value="4">SF</option>
          <option value="99">その他</option>
        </select>
        <button
          type="submit"
          className="bg-accent block w-40 rounded text-white"
        >
          検索する
        </button>
      </div>
    </form>
  );
}

export default Search;
