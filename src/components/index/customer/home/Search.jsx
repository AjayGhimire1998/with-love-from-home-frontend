import React from "react";

function Search() {
  return (
    <div className="ui category search">
      <div className="ui icon input">
        <input
          className="prompt"
          type="text"
          placeholder="Search products, stores..."
        />
        <i className="search icon"></i>
      </div>
      <div class="results"></div>
    </div>
  );
}

export default Search;
