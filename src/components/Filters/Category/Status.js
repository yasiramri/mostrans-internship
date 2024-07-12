// /src/components/Filters/Status.js

import React from "react";
import FilterBTN from "../FilterBTN";

const Status = ({ setStatus }) => {
  let status = ["Alive", "Dead", "Unknown"];
  return (
    <div className="accordion-item">
      <h2 className="accordion-header">
        <button
          className="accordion-button collapsed"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#collapseStatus"
          aria-expanded="false"
          aria-controls="collapseStatus"
        >
          Status
        </button>
      </h2>
      <div
        id="collapseStatus"
        className="accordion-collapse collapse"
        data-bs-parent="#accordionExample"
      >
        <div className="accordion-body">
          {status.map((item, index) => (
            <FilterBTN
              key={index}
              name="status"
              index={index}
              items={item}
              setFilter={setStatus}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Status;
