// /src/components/Pagination/Pagination.js
import React from "react";
import ReactPaginate from "react-paginate";
import styles from "./Pagination.module.scss"; // Import the SCSS file

const Pagination = ({ pageCount, onPageChange }) => {
  return (
    <ReactPaginate
      previousLabel={"Previous"}
      nextLabel={"Next"}
      breakLabel={"..."}
      breakClassName={"break-me"}
      pageCount={pageCount}
      marginPagesDisplayed={2}
      pageRangeDisplayed={5}
      onPageChange={onPageChange}
      containerClassName={styles.pagination}
      subContainerClassName={"pages pagination"}
      activeClassName={"active"}
      pageClassName={styles.page}
      previousClassName={styles.page}
      nextClassName={styles.page}
      breakClassName={styles.page}
      activeClassName={styles.active}
      disabledClassName={styles.disabled}
    />
  );
};

export default Pagination;
