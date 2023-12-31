import React from 'react';
import ReactPaginate from 'react-paginate';
import styles from './Pagination.module.scss';

const Pagination = ({ onCangePage, currentPage, pageCount }) => {
  return (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      nextLabel=">"
      previousLabel="<"
      onPageChange={(event) => onCangePage(event.selected + 1)}
      pageRangeDisplayed={4}
      pageCount={pageCount}
      forcePage={currentPage - 1}
    />
  );
};

export default Pagination;
