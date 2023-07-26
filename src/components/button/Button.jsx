import css from "./Button.module.scss";
import { FaTrashAlt } from "react-icons/fa";

const Button = ({ className, text, disabled, onClick, type }) => {
  return (
    <button
      className={
        className === "secondary"
          ? css.secondary
          : className === "delete"
          ? css.delete
          : ""
      }
      type={type ? type : "button"}
      disabled={disabled === true ? true : false}
      onClick={onClick}
    >
      {text ? text : <FaTrashAlt />}
    </button>
  );
};

export default Button;
