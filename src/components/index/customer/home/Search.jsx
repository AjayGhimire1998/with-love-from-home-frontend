import React from "react";
import { useState } from "react";
import {
  setSearch,
  setIsSearchLoading,
} from "../../../../features/home/homeSlice";
import { useDispatch, useSelector } from "react-redux";
import "./home.css";
import SearchedResults from "./SearchedResults";

function Search() {
  const dispatch = useDispatch();
  const { isSearchLoading } = useSelector((store) => store.home);
  const [isTyping, setIsTyping] = useState(false);

  const handleKeyUp = () => {
    // Set isTyping to false when a key is released
    setIsTyping(false);

    // If not typing, set isSearchLoading to false
    if (!isTyping) {
      dispatch(setIsSearchLoading(false));
    }
  };
  const handleBlur = () => {
    dispatch(setIsSearchLoading(false));
  };
  return (
    <div className={isSearchLoading ? "ui loading search" : "ui search"}>
      <div className="ui icon input">
        <input
          className="prompt"
          type="text"
          placeholder="Search products, stores..."
          onChange={(e) => {
            setIsTyping(true);
            dispatch(setSearch(e.target.value));
          }}
          onKey={handleKeyUp}
          onBlur={handleBlur}
        />
        <i className="search icon"></i>
      </div>
      <SearchedResults />
    </div>
  );
}

export default Search;
