import css from "./RequestDetail.module.scss";
import { FaArrowLeft } from "react-icons/fa";
import Button from "./../../button/Button";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "./../../App";
import { useContext } from "react";
import PageError from "./../page-error/PageError";
import { countRequests, userById } from "./../../utils";

const RequestDetail = () => {
  const params = useParams();
  const { users, requests, setRequests } = useContext(AppContext);
  const navigate = useNavigate();

  const requestInfo = requests.find((request) => request.id === params.id);
  const userInfo = requestInfo
    ? userById(users, requestInfo.receiverId)
    : {
        id: null,
        name: null,
        email: null,
        phone: null,
      };

  const handleDelete = () => {
    const answer = window.confirm("Удалить заявку?");
    if (answer) {
      setRequests(
        requests.filter((request) => request.id !== requestInfo.id),
        navigate(requests.length > 1 ? "/request-list" : "/")
      );
    }
  };

  return requestInfo ? (
    <div className={css.requestDetail}>
      <div className={css.titleBlock}>
        <FaArrowLeft
          className={css.buttonReturn}
          onClick={() => navigate("/request-list")}
        />
        <h1 className={css.title}>{"Детали заявки"}</h1>
      </div>
      <div className={css.mainBlock}>
        <div className={css.userInfo}>
          <div className={css.userInfoHeader}>
            <span className={css.userInfoBold}>{"Получатель: "}</span>
          </div>
          <div className={css.userInfoBody}>
            <div className={css.userInfoItem}>
              <div className={css.userInfoTitle}>{"ФИО: "}</div>
              <div className={css.userInfoValue}>{userInfo.name}</div>
            </div>

            <div className={css.userInfoItem}>
              <div className={css.userInfoTitle}>Email:</div>
              <div className={css.userInfoValue}>{userInfo.email}</div>
            </div>
            <div className={css.userInfoItem}>
              <div className={css.userInfoTitle}>Телефон:</div>
              <div className={css.userInfoValue}>{userInfo.phone}</div>
            </div>
            <div className={css.userInfoItem}>
              <div className={css.userInfoTitle}>Заявок:</div>
              <div className={css.userInfoValue}>
                {countRequests(requests, userInfo.id)}
              </div>
            </div>
          </div>
        </div>
        <div className={css.requestInfo}>
          <div className={css.requestInfoHeader}>
            <span className={css.requestInfoBold}>{"ID заявки: "}</span>
            {requestInfo.id}
          </div>
          <div className={css.requestInfoBody}>
            <div className={css.requestSenderItem}>
              <div className={css.requestSenderTitle}>Отправитель:</div>
              <div className={css.requestSenderValue}>
                {requestInfo.senderName}
              </div>
            </div>

            <div className={css.requestSenderItem}>
              <div className={css.requestSenderTitle}>Email:</div>
              <div className={css.requestSenderValue}>
                {requestInfo.senderEmail}
              </div>
            </div>
            <div className={css.requestSenderItem}>
              <div className={css.requestSenderTitle}>Телефон:</div>
              <div className={css.requestSenderValue}>
                {requestInfo.senderPhone}
              </div>
            </div>
            <div className={css.requestSenderBlock}>
              <div className={css.senderBlockTitle}>Заявка:</div>
              <div className={css.senderBlockValue}>
                {requestInfo.requestText}
              </div>
              <Button
                text={"Удалить заявку"}
                className={"delete"}
                onClick={handleDelete}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className={css.userDetail}>
      <PageError text={"Ошибка! Такой заявки не существует!"} />
    </div>
  );
};

export default RequestDetail;
