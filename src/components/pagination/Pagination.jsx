import css from "./Pagination.module.scss";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import classNames from "classnames";

function Pagination({
  requestsPerPage,
  totalRequests,
  activePage,
  setActivePage,
  prevPage,
  nextPage,
}) {
  let pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalRequests / requestsPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <div className={css.pageNav}>
      <span
        onClick={prevPage}
        className={classNames(css.pageButton, activePage === 1 && css.none)}
      >
        <FaArrowLeft />
        <span className={css.pageNavText}> Пред.</span>
      </span>
      {pageNumbers.map((number) => (
        <span
          className={classNames(
            css.pageButton,
            css.number,
            activePage === number && css.activePage
          )}
          key={number}
          onClick={() => setActivePage(number)}
        >
          {number}
        </span>
      ))}
      <span
        className={classNames(
          css.pageButton,
          activePage === Math.ceil(totalRequests / requestsPerPage) && css.none
        )}
        onClick={nextPage}
      >
        <span className={css.pageNavText}>След.</span>
        <FaArrowRight />
      </span>
    </div>
  );
}

export default Pagination;
