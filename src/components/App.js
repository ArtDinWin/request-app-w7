import { useState, useEffect, createContext } from "react";
import "./main.scss";
import { HashRouter as Router } from "react-router-dom";
import Header from "./header/Header";
import Main from "./main/Main";
import mockData from "./mock.json";

export const AppContext = createContext(null);

function App() {
  const localStorageData = JSON.parse(
    window.localStorage.getItem("requests-app")
  );
  const defaultDataUsers = localStorageData
    ? localStorageData.users
    : false || mockData;
  const defaultDataRequests = localStorageData
    ? localStorageData.requests
    : false || [
        {
          id: "lkr17idz",
          senderName: "Пономарев Сергей Захарович",
          senderEmail: "MonroeBReed@dayrep.com",
          senderPhone: "+7-933-706-25-26",
          receiverId: "lki16idz",
          requestText: `Для ремонта коридора поста ЭЦ ст. Ферма необходимо изготовить 
и установить 3 противопожарные двери в дверные проемы;
1. 2030 мм. × 970 мм. – 1 шт.
2. 2030 мм. × 970 мм. – 1 шт.
3. 2030 мм. × 870 мм. – 1 шт.`,
        },
      ];
  const [requests, setRequests] = useState(defaultDataRequests);
  const users = defaultDataUsers;

  useEffect(() => {
    window.localStorage.setItem(
      "requests-app",
      JSON.stringify({
        users: users,
        requests: requests,
      })
    );

    return () => {
      window.localStorage.setItem(
        "requests-app",
        JSON.stringify({
          users: users,
          requests: requests,
        })
      );
    };
  }, [users, requests]);

  return (
    <Router>
      <AppContext.Provider value={{ users, requests, setRequests }}>
        <Header />
        <Main />
      </AppContext.Provider>
    </Router>
  );
}

export default App;
