import css from "./UsersList.module.scss";
import { FaUser } from "react-icons/fa";
import { MdPhoneInTalk, MdMail, MdSpeakerNotes } from "react-icons/md";
import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import { AppContext } from "./../../App";
import { countRequests } from "./../../utils";
import Pagination from "./../../pagination/Pagination";

const UsersList = (props) => {
  const { users, requests } = useContext(AppContext);
  const [activePage, setActivePage] = useState(1);
  const prevPage = () => setActivePage((prevState) => prevState - 1);
  const nextPage = () => setActivePage((prevState) => prevState + 1);
  const usersPerPage = 5;
  const renderUsers = users.slice(
    activePage * usersPerPage - usersPerPage,
    activePage * usersPerPage
  );

  function UserItem({ user }) {
    return (
      <Link to={"/user/" + user.id}>
        <li className={css.itemUser}>
          <div className={css.userIconWrap}>
            <FaUser className={css.userIcon} />
          </div>
          <div className={css.userInfo}>
            <div className={css.userName}>{user.name}</div>
            <div className={css.userEmail}>
              <MdMail className={css.iconContact} />
              {user.email}
            </div>
            <div className={css.userPhone}>
              <MdPhoneInTalk className={css.iconContact} />
              {user.phone}
            </div>
          </div>
          <MdSpeakerNotes title={"Заявок"} className={css.iconContact} />
          <div className={css.userRequest}>
            {countRequests(requests, user.id)}
          </div>
        </li>
      </Link>
    );
  }

  return (
    <div className={css.page}>
      {users.length < 1 ? (
        <>
          <h1>Нет данных</h1>
          <div className={css.mainBlock}></div>
        </>
      ) : (
        <>
          <h1>Пользователи</h1>
          <div className={css.mainBlock}>
            <ul className={css.listUsers}>
              {renderUsers.map((user) => (
                <UserItem key={user.id} user={user} />
              ))}
            </ul>
          </div>
        </>
      )}
      <div className={css.bottomBlock}>
        <div className={css.totalInfo}>
          <div className={css.totalInfoWrap}>
            <span className={css.totalInfoTitle}>Пользователей:</span>
            {users.length}
          </div>
          <div className={css.totalInfoWrap}>
            <span className={css.totalInfoTitle}>Заявок:</span>
            {requests.length}
          </div>
        </div>
        {users.length <= usersPerPage ? null : (
          <Pagination
            requestsPerPage={usersPerPage}
            totalRequests={users.length}
            activePage={activePage}
            setActivePage={(number) => setActivePage(number)}
            nextPage={nextPage}
            prevPage={prevPage}
          />
        )}
      </div>
    </div>
  );
};

export default UsersList;
