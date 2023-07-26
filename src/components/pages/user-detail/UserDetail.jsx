import css from "./UserDetail.module.scss";
import { FaArrowLeft } from "react-icons/fa";
import uniqid from "uniqid";
import Button from "./../../button/Button";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "./../../App";
import { useState, useEffect, useContext } from "react";
import PageError from "./../page-error/PageError";
import {
  countRequests,
  userById,
  checkNotValidEmail,
  checkNotValidInput,
} from "./../../utils";

const UserDetail = () => {
  const params = useParams();
  const { users, requests, setRequests } = useContext(AppContext);
  const navigate = useNavigate();
  const userInfo = userById(users, params.id);
  const [requestInfo, setRequestInfo] = useState({
    id: uniqid(),
    senderName: "",
    nameMessage: "",
    senderEmail: "",
    emailMessage: "",
    senderPhone: "",
    phoneMessage: "",
    receiverId: userInfo ? userInfo.id : null,
    requestText: "",
    textMessage: "",
    firstTouch: true,
  });

  const checkDisabledButton = () => {
    if (
      requestInfo.emailMessage ||
      requestInfo.phoneMessage ||
      requestInfo.nameMessage ||
      requestInfo.textMessage ||
      !requestInfo.senderEmail ||
      !requestInfo.senderPhone ||
      !requestInfo.senderName ||
      !requestInfo.requestText
    ) {
      return true;
    } else {
      return false;
    }
  };

  const renderDataObj = (requestInfo) => {
    return {
      id: requestInfo.id,
      senderName: requestInfo.senderName.trim(),
      senderEmail: requestInfo.senderEmail,
      senderPhone: requestInfo.senderPhone,
      receiverId: requestInfo.receiverId,
      requestText: requestInfo.requestText.trim(),
    };
  };

  const handleSubmit = () => {
    setRequests([...requests, renderDataObj(requestInfo)]);
    window.alert("Заявка успешно добавлена!");
    navigate("/request-list");
  };

  useEffect(() => {
    if (!requestInfo.firstTouch) {
      setRequestInfo((prevState) => {
        return {
          ...prevState,
          emailMessage: checkNotValidEmail(requestInfo.senderEmail),
          phoneMessage: checkNotValidInput(requestInfo.senderPhone),
          nameMessage: checkNotValidInput(requestInfo.senderName),
          textMessage: checkNotValidInput(requestInfo.requestText),
        };
      });
    } else {
      setRequestInfo((prevState) => {
        return {
          ...prevState,
          firstTouch: false,
        };
      });
    }
  }, [
    requestInfo.senderEmail,
    requestInfo.senderPhone,
    requestInfo.senderName,
    requestInfo.requestText,
    requestInfo.firstTouch,
  ]);

  return userInfo ? (
    <div className={css.userDetail}>
      <div className={css.titleBlock}>
        <FaArrowLeft
          className={css.buttonReturn}
          onClick={() => navigate("/")}
        />
        <h1 className={css.title}>{"Пользователь"}</h1>
      </div>
      <form
        className={css.mainBlock}
        id="form-user-detail"
        onSubmit={handleSubmit}
      >
        <div className={css.userInfo}>
          <div className={css.userInfoHeader}>
            <span className={css.userInfoBold}>{"User-ID: "}</span>
            {userInfo.id}
          </div>
          <div className={css.userInfoBody}>
            <div className={css.userInfoItem}>
              <div className={css.userInfoTitle}>{"Пользователь: "}</div>
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
            <span className={css.requestInfoBold}>{"Оставить заявку"}</span>
          </div>
          <div className={css.requestInfoBody}>
            <div className={css.requestSenderItem}>
              <div className={css.requestSenderTitle}>
                Отправитель:<span>{" *"}</span>
              </div>
              <div className={css.requestSenderWrap}>
                <input
                  className={css.requestSenderWrite}
                  type="text"
                  placeholder="Введите ФИО"
                  value={requestInfo.senderName}
                  maxLength="40"
                  onChange={(e) => {
                    setRequestInfo({
                      ...requestInfo,
                      senderName: e.target.value,
                    });
                  }}
                />
                {requestInfo.senderName ? (
                  <p className={css.entryInfo}>{requestInfo.nameMessage}</p>
                ) : null}
              </div>
            </div>

            <div className={css.requestSenderItem}>
              <div className={css.requestSenderTitle}>
                Email:<span>{" *"}</span>
              </div>
              <div className={css.requestSenderWrap}>
                <input
                  className={css.requestSenderWrite}
                  type="text"
                  placeholder="Введите email"
                  value={requestInfo.senderEmail}
                  maxLength="30"
                  onChange={(e) => {
                    setRequestInfo({
                      ...requestInfo,
                      senderEmail: e.target.value.trim(),
                    });
                  }}
                />
                {requestInfo.senderEmail ? (
                  <p className={css.entryInfo}>{requestInfo.emailMessage}</p>
                ) : null}
              </div>
            </div>
            <div className={css.requestSenderItem}>
              <div className={css.requestSenderTitle}>
                Телефон:<span>{" *"}</span>
              </div>
              <div className={css.requestSenderWrap}>
                <input
                  className={css.requestSenderWrite}
                  type="tel"
                  value={requestInfo.senderPhone}
                  placeholder="Пример: +7-987-343-55-55"
                  maxLength="16"
                  onChange={(e) => {
                    setRequestInfo({
                      ...requestInfo,
                      senderPhone: e.target.value.replace(/[^0-9+-]/g, ""),
                    });
                  }}
                />
                <p className={css.entryInfo}></p>
                {requestInfo.senderPhone ? (
                  <p className={css.entryInfo}>{requestInfo.phoneMessage}</p>
                ) : null}
              </div>
            </div>
            <div className={css.requestSenderBlock}>
              <div className={css.senderBlockTitle}>
                Заявка:<span>{" *"}</span>
              </div>
              <textarea
                className={css.senderBlockValue}
                placeholder="Введите текст заявки"
                value={requestInfo.requestText}
                onChange={(e) => {
                  setRequestInfo({
                    ...requestInfo,
                    requestText: String(e.target.value),
                  });
                }}
              />
              {requestInfo.requestText ? (
                <p className={css.entryInfo}>{requestInfo.textMessage}</p>
              ) : null}
              <Button
                text={"Отправить заявку"}
                className={"main"}
                disabled={checkDisabledButton()}
                form="form-user-detail"
                type="submit"
              />
            </div>
            <p className={css.entryInfo}>* Обязательные для заполнения поля</p>
          </div>
        </div>
      </form>
    </div>
  ) : (
    <div className={css.userDetail}>
      <PageError text={"Ошибка! Такого пользователя не существует!"} />
    </div>
  );
};

export default UserDetail;
