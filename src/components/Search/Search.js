// /src/components/Search/Search.js
import React, { useState } from "react";
import styles from "./Search.module.scss";

const Search = ({ onSearch, onSearchStatusChange, setPageNumber }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(searchTerm.trim());
    setPageNumber(1);
    onSearchStatusChange(true);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="d-flex justify-content-center gap-4 mb-5">
        <input
          type="text"
          className={`form-control ${styles.input}`}
          placeholder="Cari karakter..."
          value={searchTerm}
          onChange={handleChange}
        />
        <div className="input-group-append">
          <button
            className={`${styles.btn} btn btn-success fs-5`}
            type="submit"
          >
            Search
          </button>
        </div>
      </div>
    </form>
  );
};

export default Search;
