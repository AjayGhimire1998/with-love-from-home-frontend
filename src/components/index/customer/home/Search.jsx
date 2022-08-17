import React from "react";
import { useNavigate } from "react-router";
import { setSearch } from "../../../../features/home/homeSlice";
import { useDispatch, useSelector } from "react-redux";
import "./home.css";
import SearchedResults from "./SearchedResults";

function Search() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isSearchLoading } = useSelector(
    (store) => store.home
  );
  return (
    <div className={isSearchLoading ? "ui loading search" : "ui search"}>
      <div className="ui icon input">
        <input
          className="prompt"
          type="text"
          placeholder="Search products, stores..."
          onChange={(e) => dispatch(setSearch(e.target.value))}
        />
        <i className="search icon"></i>
      </div>
      <SearchedResults />
    </div>
  );
}

export default Search;
