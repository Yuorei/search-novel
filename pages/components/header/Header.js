import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookOpen } from "@fortawesome/free-solid-svg-icons";
import { faFaceLaughSquint } from "@fortawesome/free-regular-svg-icons";

function Header() {
  return (
    <header className="bg-main">
      <div className="pt-10 pb-10 pr-8 pl-8">
        <FontAwesomeIcon icon={faBookOpen} className="text-white pr-2" />
        <a href="#" className="text-white text-xl font-bold">
          小説検索サイト
        </a>

        <ul className="inline-block float-right">
          <FontAwesomeIcon
            icon={faFaceLaughSquint}
            className="text-white inline-block pr-1"
          />
          <li className="text-white inline-block pr-10">
            <a href="#">開発チーム</a>
          </li>
          <li className="text-white inline-block pl-10">
            <a href="#">このサイトでできること</a>
          </li>
        </ul>
      </div>
    </header>
  );
}

export default Header;
