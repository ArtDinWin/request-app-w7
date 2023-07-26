import css from "./Request.module.scss";
import uniqid from "uniqid";
import Button from "./../../button/Button";
import { useNavigate } from "react-router-dom";
import { AppContext } from "./../../App";
import { useState, useEffect, useContext } from "react";
import {
  countRequests,
  userById,
  checkNotValidEmail,
  checkNotValidInput,
} from "./../../utils";
import classNames from "classnames";

const Request = () => {
  const { users, requests, setRequests } = useContext(AppContext);
  const navigate = useNavigate();
  const [requestInfo, setRequestInfo] = useState({
    id: uniqid(),
    senderName: "",
    nameMessage: "",
    senderEmail: "",
    emailMessage: "",
    senderPhone: "",
    phoneMessage: "",
    receiverId: "null",
    requestText: "",
    textMessage: "",
    firstTouch: true,
  });

  const renderSelect = (
    <div className={css.userInfoWrap}>
      <select
        name="users"
        className={classNames(
          css.userInfoWrite,
          requestInfo.receiverId === "null" && css.error
        )}
        value={requestInfo.receiverId}
        onChange={(e) => {
          setRequestInfo({ ...requestInfo, receiverId: e.target.value });
        }}
      >
        <option value="null">--Выбор получателя--</option>
        {users.map((user) => (
          <option value={user.id} key={user.id}>
            {user.name}
          </option>
        ))}
      </select>
      {requestInfo.receiverId === "null" ? (
        <p className={css.entryInfo}>* Обязательное для выбора поле</p>
      ) : null}
    </div>
  );

  const userInfo =
    requestInfo.receiverId !== "null"
      ? userById(users, requestInfo.receiverId)
      : {
          id: "нет данных",
          name: "нет данных",
          email: "нет данных",
          phone: "нет данных",
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
    requestInfo.receiverId,
    requestInfo.firstTouch,
  ]);

  const checkDisabledButton = () => {
    if (
      requestInfo.receiverId === "null" ||
      requestInfo.emailMessage ||
      requestInfo.phoneMessage ||
      requestInfo.nameMessage ||
      requestInfo.textMessage
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

  return (
    <div className={css.request}>
      <div className={css.titleBlock}>
        <h1 className={css.title}>{"Оставить заявку"}</h1>
      </div>
      <form className={css.mainBlock} onSubmit={handleSubmit} id="form-request">
        <div className={css.userInfo}>
          <div className={css.userInfoHeader}>
            <span className={css.userInfoBold}>{"Получатель: "}</span>
          </div>
          <div className={css.userInfoBody}>
            <div className={css.userInfoItem}>
              <div className={css.userInfoTitle}>
                {"Получатель: "}
                <span>{" *"}</span>
              </div>
              {renderSelect}
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
                {countRequests(requests, requestInfo.receiverId)}
              </div>
            </div>
          </div>
        </div>
        <div className={css.requestInfo}>
          <div className={css.requestInfoHeader}>
            <span className={css.requestInfoBold}>{"Новая заявка: "}</span>
          </div>
          <div className={css.requestInfoBody}>
            <div className={css.requestSenderItem}>
              <div className={css.requestSenderTitle}>
                Отправитель:
                <span>{" *"}</span>
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
                Email:
                <span>{" *"}</span>
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
                Телефон:
                <span>{" *"}</span>
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
                Заявка:
                <span>{" *"}</span>
              </div>
              <textarea
                className={css.senderBlockValue}
                placeholder="Введите текст заявки"
                value={requestInfo.requestText}
                onChange={(e) => {
                  setRequestInfo({
                    ...requestInfo,
                    requestText: e.target.value,
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
                form="form-request"
                type="submit"
              />
            </div>
            <p className={css.entryInfo}>* Обязательные для заполнения поля</p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Request;
