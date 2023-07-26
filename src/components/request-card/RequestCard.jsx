import css from "./RequestCard.module.scss";
import Button from "./../button/Button";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "./../App";
import { userById } from "./../utils";
import classNames from "classnames";

function RequestsCard({ renderRequests }) {
  const { users, requests, setRequests } = useContext(AppContext);
  const navigate = useNavigate();

  const handleDelete = (requestId) => {
    const answer = window.confirm("Удалить заявку?");
    if (answer) {
      setRequests(
        requests.filter((request) => request.id !== requestId),
        navigate(requests.length > 1 ? "/request-list" : "/")
      );
    }
  };

  return (
    <>
      {renderRequests.map((request, i) => (
        <div className={css.card} key={request.id}>
          <div className={css.cardHeader}>
            <div className={css.cardTitle}>
              <span>Заявка №</span>
              {" " + request.id}
            </div>
          </div>
          <div className={css.cardInfo}>
            <div className={css.cardItem}>
              <span>Получатель: </span>
              {userById(users, request.receiverId).name}
            </div>
            <div className={css.cardItem}>
              <span>Отправитель:</span>
              {request.senderName}
            </div>
            <div className={classNames(css.cardItem, css.text)}>
              <span>Заявка:</span>
              <div className={css.requestText}>{request.requestText}</div>
            </div>
            <div className={css.cardItemButton}>
              <Button
                className={"delete"}
                onClick={() => handleDelete(request.id)}
              />
              <Button
                text={"Детали"}
                onClick={() => navigate("/request/" + request.id)}
              />
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
export default RequestsCard;
