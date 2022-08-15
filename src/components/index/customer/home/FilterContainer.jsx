import React from "react";
import Filter from "./Filter";
import Search from "./Search";

function FilterContainer() {
  return (
    <div className="ui stackable four column grid">
      <div className="ui left floated column">
        <span>Filter by Categories:</span>
        <Filter />
      </div>
      <div className="ui right floated column">
        <span style={{ float: "right", color: "white" }}>Search</span>
        <Search />
      </div>
    </div>
  );
}

export default FilterContainer;
