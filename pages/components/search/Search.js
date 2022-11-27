import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faL, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from "react";
import styles from "./Search.module.css";
import axios from "axios";
import jsonpAdaper from "axios-jsonp";
import Link from "next/link";

function Search() {
  const [option, setOption] = useState("");
  const [searchBtnClick, setSearchBtnClick] = useState(false);
  const [getComplete, setGetComplete] = useState(false);
  const [response, setResponse] = useState();
  const [genre, setGenre] = useState("");

  const getGiggenreData = async () => {
    const API_URL = `https://api.syosetu.com/novelapi/api/?out=jsonp&biggenre=${option}`;
    try {
      const response = await (
        await axios.get(API_URL, { adapter: jsonpAdaper })
      ).data;
      setGetComplete(true);
      setResponse(response);
      return response;
    } catch (err) {
      console.log(err);
      setGetComplete(false);
    }
  };

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
                setSearchBtnClick(false);
                setResponse();
                setGetComplete(false);
                setGenre(
                  e.target.options[e.target.options.selectedIndex].textContent
                );
              }}
              defaultValue="0"
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
      <section className="my-10">
        {getComplete === false && searchBtnClick === true ? (
          <p className="text-xl">検索中...</p>
        ) : (
          ""
        )}
        {getComplete && searchBtnClick ? (
          genre === "" ? (
            <p className="text-xl">すべて：ジャンル検索結果</p>
          ) : (
            <p className="text-xl">{genre}：ジャンル検索結果</p>
          )
        ) : (
          ""
        )}
        {getComplete || searchBtnClick
          ? response?.map((novel, i) => (
              <p className="text-lg my-10 w-full" key={i}>
                <Link
                  href={`https://db.narou.fun/works/${novel.ncode}`}
                  className={`${styles.link}`}
                >
                  {i === 0 ? "" : `${i}: ${novel.title}`}
                </Link>
              </p>
            ))
          : ""}
      </section>
    </section>
  );
}

export default Search;
