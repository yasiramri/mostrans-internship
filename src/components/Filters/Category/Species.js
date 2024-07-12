// /src/components/Filters/Species.js

import React from "react";
import FilterBTN from "../FilterBTN";

const Species = ({ setSpecies }) => {
  let speciesList = [
    "Human",
    "Alien",
    "Robot",
    "Animal",
    "Mythological",
    "Unknown",
  ];
  return (
    <div className="accordion-item">
      <h2 className="accordion-header">
        <button
          className="accordion-button collapsed"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#collapseSpecies"
          aria-expanded="false"
          aria-controls="collapseSpecies"
        >
          Species
        </button>
      </h2>
      <div
        id="collapseSpecies"
        className="accordion-collapse collapse"
        data-bs-parent="#accordionExample"
      >
        <div className="accordion-body">
          {speciesList.map((item, index) => (
            <FilterBTN
              key={index}
              name="species"
              index={index}
              items={item}
              setFilter={setSpecies}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Species;
