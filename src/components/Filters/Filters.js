// /src/components/Filters/Filters.js

import React from "react";
import Status from "../Filters/Category/Status";
import Gender from "../Filters/Category/Gender";
import Species from "../Filters/Category/Species";

const Filters = ({ setStatus, setGender, setSpecies, clearFilters }) => {
  return (
    <div className="col-lg-4 col-12 mb-5">
      <div className="text-center fw-bold fs-4 mb-2">Filters</div>
      <div className="accordion" id="accordionExample">
        <Status setStatus={setStatus} />
        <Gender setGender={setGender} />
        <Species setSpecies={setSpecies} />
      </div>

      <div
        style={{ cursor: "pointer" }}
        className="text-center text-success text-decoration-underline mb-4"
        onClick={clearFilters}
      >
        Clear Filters
      </div>
    </div>
  );
};

export default Filters;
