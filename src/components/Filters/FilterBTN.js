// /src/components/Filters/FilterBTN.js

import React from "react";

const FilterBTN = ({ name, index, items, setFilter }) => {
  return (
    <div>
      <style jsx>
        {`
          .form-check-input:checked + label {
            background-color: #177c4d;
            color: white;
          }
          input[type="radio"] {
            display: none;
          }
        `}
      </style>
      <div className="form-check">
        <input
          className="form-check-input"
          type="radio"
          name={name}
          id={`${name}-${index}`}
          value={items}
          onChange={(e) => setFilter(e.target.value)}
        />
        <label className="btn btn-outline-success" htmlFor={`${name}-${index}`}>
          {items}
        </label>
      </div>
    </div>
  );
};

export default FilterBTN;
