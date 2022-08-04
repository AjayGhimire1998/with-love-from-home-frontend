import React from "react";
// import MultiSelect from "react-multiple-select-dropdown-lite";
// import "react-multiple-select-dropdown-lite/dist/index.css";
import "./dropdown.css";
import Select from "react-select";
import { categoryIdChanger } from "../../../features/auth/storeSlice";
import { useDispatch } from "react-redux";

function Dropdown({ categoryItems, categoryId }) {
  const dispatch = useDispatch();

  const options = categoryItems.map((item) => {
    return {
      id: item.id,
      label: item.name,
      value: item.name,
    };
  });

  const handleChange = (selectedOption) => {
    dispatch(categoryIdChanger(selectedOption.id));
  };

  return (
    <div className="field">
      <label style={{ textAlign: "left" }}>Select Store's category</label>
      <Select
        className="basic-single"
        classNamePrefix="select"
        defaultValue="options[7].name"
        options={options}
        onChange={handleChange}
      />
      <br />
    </div>
  );
}

export default Dropdown;
