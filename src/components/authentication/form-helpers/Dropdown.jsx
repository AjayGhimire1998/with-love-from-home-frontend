import React from "react";
import "./dropdown.css";
import Select from "react-select";
import { categoryIdChanger } from "../../../features/auth/storeSlice";
import { setCategoryId } from "../../../features/home/homeSlice";
import { useDispatch} from "react-redux";
import { setFilteredProducts } from "../../../features/home/homeSlice";

function Dropdown({ categoryItems }) {
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
    dispatch(setCategoryId(selectedOption.id));
    dispatch(setFilteredProducts());
  };

  return (
    <Select
      className="basic-single"
      classNamePrefix="select"
      defaultValue=""
      options={options}
      onChange={handleChange}
    />
  );
}

export default Dropdown;
