import React, { useState } from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import { useDispatch } from "react-redux";
import {
  setFullAddress,
  setState,
  setStreetAddress,
  setSuburb,
  setZip,
} from "../../../../features/cart/cartFormSlice";
// import { setAddress } from "../../../../features/home/homeproductSlice";
import { v4 as uuidv4 } from "uuid";

function PlacesAutoComplete() {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();

  const handleChange = (search) => {
    setSearch(search);
  };

  const handleSelect = (search) => {
    geocodeByAddress(search)
      .then((results) => {
        if (results.length <= 8) {
          const component = results[0].address_components;
          dispatch(setFullAddress(results[0].formatted_address));
          dispatch(
            setStreetAddress(
              `${component[0].long_name} ${component[1].long_name}  `
            )
          );
          dispatch(setState(component[component.length - 3].short_name));
          dispatch(setZip(component[component.length - 1].short_name));
          dispatch(setSuburb(component[component.length - 5].long_name));
          console.log(results);
          getLatLng(results[0]);
        }
      })
      .then((latLng) => console.log("Success", latLng))
      .catch((error) => console.error("Error", error));
  };

  return (
    <PlacesAutocomplete
      value={search}
      onChange={handleChange}
      onSelect={handleSelect}
    >
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
        <div>
          <div className="ui icon input">
            <input
              {...getInputProps({
                placeholder: "Search Address ...",
                className: "location-search-input",
                type: "search",
              })}
            />
            <i className="search icon"></i>
          </div>

          <div className="autocomplete-dropdown-container">
            {loading && <div>Loading...</div>}
            {suggestions.map((suggestion) => {
              if (suggestion.description.includes("Australia" || "AU")) {
                const className = suggestion.active
                  ? "suggestion-item--active"
                  : "suggestion-item";
                // inline style for demonstration purpose
                const style = suggestion.active
                  ? {
                      backgroundColor: "black",
                      color: "white",
                      cursor: "pointer",
                      border: "1px solid black",
                      padding: "10px",
                    }
                  : {
                      backgroundColor: "#ffffff",
                      cursor: "pointer",
                      border: "1px solid black",
                      padding: "8px",
                    };
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style,
                    })}
                    key={uuidv4()}
                  >
                    <span>{suggestion.description}</span>
                  </div>
                );
              } else {
                return null;
              }
            })}
          </div>
        </div>
      )}
    </PlacesAutocomplete>
  );
}

export default PlacesAutoComplete;
