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

  const getGiggenreData = async (option) => {
    let API_URL;
    if (1 <= option <= 99) {
      API_URL = `https://api.syosetu.com/novelapi/api/?out=jsonp&biggenre=${option}`;
    } else if (101 <= option <= 9999) {
      API_URL = `https://api.syosetu.com/novelapi/api/?out=jsonp&genre=${option}`;
    }
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
              name="genre"
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
              <option disabled="disabled" value="0" name="genre">
                ジャンルを絞る
              </option>
              <option value="" name="genre">
                すべて
              </option>
              <option disabled="disabled" name="genre">
                大ジャンル
              </option>
              <option value="1" name="genre">
                恋愛
              </option>
              <option value="2" name="genre">
                ファンタジー
              </option>
              <option value="3" name="genre">
                文芸
              </option>
              <option value="4" name="genre">
                SF
              </option>
              <option value="99" name="genre">
                その他
              </option>
              <option disabled="disabled" name="genre">
                詳細ジャンル
              </option>
              <option value="101" name="genre">
                異世界（恋愛）
              </option>
              <option value="102" name="genre">
                現実世界（恋愛）
              </option>
              <option value="201" name="genre">
                ハイファンタジー（ファンタジー）
              </option>
              <option value="202" name="genre">
                ローファンタジー（ファンタジー）
              </option>
              <option value="301" name="genre">
                純文学（文学）
              </option>
              <option value="302" name="genre">
                ヒューマンドラマ（文学）
              </option>
              <option value="303" name="genre">
                歴史（文芸）
              </option>
              <option value="304" name="genre">
                推理（文芸）
              </option>
              <option value="305" name="genre">
                ホラー（文芸）
              </option>
              <option value="306" name="genre">
                アクション（文芸）
              </option>
              <option value="307" name="genre">
                コメディー（文芸）
              </option>
              <option value="401" name="genre">
                VRゲーム（SF）
              </option>
              <option value="402" name="genre">
                宇宙（SF）
              </option>
              <option value="403" name="genre">
                空想科学（SF）
              </option>
              <option value="404" name="genre">
                パニック（SF）
              </option>
              <option value="9801" name="genre">
                ノンジャンル（ノンジャンル）
              </option>
              <option value="9901" name="genre">
                童話（その他）
              </option>
              <option value="9902" name="genre">
                詩（その他）
              </option>
              <option value="9903" name="genre">
                エッセイ（その他）
              </option>
              <option value="9904" name="genre">
                リプレイ（その他）
              </option>
              <option value="9999" name="genre">
                その他（その他）
              </option>
            </select>
            <button
              className="bg-accent block p-2 w-48 rounded text-white"
              onClick={() => {
                setSearchBtnClick(true);
                getGiggenreData(option);
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
