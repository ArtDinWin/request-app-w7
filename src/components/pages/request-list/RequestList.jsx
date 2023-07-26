import css from "./RequestList.module.scss";
import Pagination from "./../../pagination/Pagination";
import RequestCard from "./../../request-card/RequestCard";
import { AppContext } from "./../../App";
import { useState, useContext } from "react";

const RequestList = (props) => {
  const { requests } = useContext(AppContext);
  const [activePage, setActivePage] = useState(1);
  const prevPage = () => setActivePage((prevState) => prevState - 1);
  const nextPage = () => setActivePage((prevState) => prevState + 1);
  const requestsPerPage = 3;
  const lastRequestIndex = activePage * requestsPerPage;
  const firstRequestIndex = lastRequestIndex - requestsPerPage;
  const renderRequests = requests.slice(firstRequestIndex, lastRequestIndex);

  return (
    <div className={css.pageRequests}>
      {requests.length < 1 ? (
        <h1>Нет заявок</h1>
      ) : (
        <>
          <h1>Заявки</h1>

          <div className={css.mainBlock}>
            <div className={css.requestsWrap}>
              <RequestCard renderRequests={renderRequests} />
            </div>
          </div>
          <div className={css.bottomBlock}>
            <div className={css.bottomBlockWrap}>
              <span className={css.bottomBlockTitle}>Всего заявок:</span>
              {requests.length}
            </div>
            {requests.length <= requestsPerPage ? null : (
              <Pagination
                requestsPerPage={requestsPerPage}
                totalRequests={requests.length}
                activePage={activePage}
                setActivePage={(number) => setActivePage(number)}
                nextPage={nextPage}
                prevPage={prevPage}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default RequestList;
