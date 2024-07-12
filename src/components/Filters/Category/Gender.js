// /src/components/Filters/Gender.js

import React from "react";
import FilterBTN from "../FilterBTN";

const Gender = ({ setGender }) => {
  let genders = ["Male", "Female", "Genderless", "unknown"];
  return (
    <div className="accordion-item">
      <h2 className="accordion-header">
        <button
          className="accordion-button collapsed"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#collapseGender"
          aria-expanded="false"
          aria-controls="collapseGender"
        >
          Gender
        </button>
      </h2>
      <div
        id="collapseGender"
        className="accordion-collapse collapse"
        data-bs-parent="#accordionExample"
      >
        <div className="accordion-body">
          {genders.map((item, index) => (
            <FilterBTN
              key={index}
              name="gender"
              index={index}
              items={item}
              setFilter={setGender}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gender;
