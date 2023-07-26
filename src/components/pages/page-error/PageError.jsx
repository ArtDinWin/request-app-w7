import css from "./PageError.module.scss";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import image from "./../../../assets/404.png";

const PageError = ({ text }) => {
  return (
    <>
      <div className={css.pageError}>
        <h1 className={css.title}>
          {text ? text : "Ошибка 404! Страницы не существует!"}
        </h1>
        <div className={css.link}>
          <Link to="/">
            <FaArrowLeft className={css.buttonReturn} />
            Вернуться на главную
          </Link>
        </div>
        <div className={css.imgWrap}>
          <img
            src={image}
            alt="Ошибка 404. Страница не найдена."
            width="100%"
          />
        </div>
      </div>
    </>
  );
};

export default PageError;
