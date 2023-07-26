import css from "./Header.module.scss";
import Button from "./../button/Button";
import { FaUser } from "react-icons/fa";
import { MdSpeakerNotes } from "react-icons/md";
import { NavLink, useNavigate } from "react-router-dom";

const Header = (props) => {
  const navigate = useNavigate();
  return (
    <header className={css.menu}>
      <nav>
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? css.active : "")}
        >
          <FaUser className={css.icon} />
          Пользователи
        </NavLink>
        <NavLink
          to="/request-list"
          className={({ isActive }) => (isActive ? css.active : "")}
        >
          <MdSpeakerNotes className={css.icon} />
          Заявки
        </NavLink>
        <Button
          text={"Оставить заявку"}
          className={"secondary"}
          onClick={() => navigate("/request")}
        />
      </nav>
    </header>
  );
};

export default Header;
