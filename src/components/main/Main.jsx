import css from "./Main.module.scss";
import UsersList from "./../pages/users-list/UsersList";
import UserDetail from "./../pages/user-detail/UserDetail";
import RequestDetail from "./../pages/request-detail/RequestDetail";
import Request from "./../pages/request/Request";
import PageError from "./../pages/page-error/PageError";
import RequestList from "./../pages/request-list/RequestList";
import { Route, Routes } from "react-router-dom";

const Main = (props) => {
  const display = (Component, type = null) => {
    return (
      <main className={css.main}>
        <Component type={type} />
      </main>
    );
  };
  return (
    <Routes>
      <Route path="/" exact element={display(UsersList)} />
      <Route path="/users" exact element={display(UsersList)} />
      <Route path="/user/:id" element={display(UserDetail)} />

      <Route path="/request-list" exact element={display(RequestList)} />
      <Route path="/request" exact element={display(Request)} />
      <Route path="/request/:id" element={display(RequestDetail)} />
      <Route path="*" element={display(PageError)} />
    </Routes>
  );
};

export default Main;
