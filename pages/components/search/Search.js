import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from "react";
import styles from "./Search.module.css";
import axios from "axios";
import jsonpAdaper from "axios-jsonp";

function Search() {
  const [option, setOption] = useState("");
  const [switchOption, setSwitchOption] = useState(false);
  const [searchBtnClick, setSearchBtnClick] = useState(false);
  const [getComplete, setGetComplete] = useState(false);
  const [titles, setTitles] = useState("");

  let titleArray = [];

  const getGiggenreData = async () => {
    titleArray = [];

    const API_URL = `https://api.syosetu.com/novelapi/api/?out=jsonp&biggenre=${option}`;
    try {
      const response = await (
        await axios.get(API_URL, { adapter: jsonpAdaper })
      ).data;
      setGetComplete(true);
      response.map((novel) => titleArray.push(novel.title));
      return response;
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    setTitles(titleArray);
  }, [switchOption]);

  getGiggenreData();

  return (
    <section className={`flex flex-col justify-center ${styles.section}`}>
      <section className={`bg-main px-12 py-12 rounded ${styles.search_box}`}>
        <div className="px-12">
          <h2 className="text-xl mb-8 text-white text-center">
            小説を検索する
          </h2>
          <div className="flex gap-4 mx-auto">
            <select
              className={`color-dark-gray px-5 py-3 w-full rounded ${styles.select}`}
              name="biggenre"
              onChange={(e) => {
                setOption(e.target.value);
                setSwitchOption((prev) => !prev);
                setSearchBtnClick(false);
                getGiggenreData();
              }}
            >
              <option disabled="disabled" value="0" name="biggenre">
                ジャンルを絞る
              </option>
              <option value="" name="biggenre">
                すべて
              </option>
              <option value="1" name="biggenre">
                恋愛
              </option>
              <option value="2" name="biggenre">
                ファンタジー
              </option>
              <option value="3" name="biggenre">
                文芸
              </option>
              <option value="4" name="biggenre">
                SF
              </option>
              <option value="99" name="biggenre">
                その他
              </option>
            </select>
            <button
              className="bg-accent block p-2 w-48 rounded text-white"
              onClick={() => {
                setSearchBtnClick(true);
                getGiggenreData();
              }}
            >
              <FontAwesomeIcon icon={faMagnifyingGlass} />
              <span className={styles.search_text}>検索する</span>
            </button>
          </div>
        </div>
      </section>
      <section className="mt-10">
        {getComplete || searchBtnClick
          ? titles.map((title, i) => (
              <p className="text-lg my-10 w-full" key={i}>
                {i === 0 ? "" : `${i}: ${title}`}
              </p>
            ))
          : ""}
        {/* {getComplete || searchBtnClick
          ? async () =>
              await getGiggenreData().then((result) =>
                result.map((novel) => <p>{novel.title}</p>)
              )
          : ""} */}
      </section>
    </section>
  );
}

export default Search;
