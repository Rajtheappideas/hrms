import React, { Fragment, useMemo, useState } from "react";
import { Redirect } from "react-router-dom";

/// Style
import "./css/style.css";
import "./vendor/bootstrap-select/dist/css/bootstrap-select.min.css";

/// layout
import Nav from "./jsx/layouts/nav";
import Footer from "./jsx/layouts/Footer";

// routes
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useHistory,
} from "react-router-dom";

/// react-resize
import { withResizeDetector } from "react-resize-detector";

/// components
import { routes, authRoutes } from "./jsx";
import Markup from "./jsx";

/// context
import { RoleContext } from "./Contexts/RoleContext";
import { UserContext } from "./Contexts/UserContext";
const App = ({ width }) => {
  // const getToken = () => {
  //   const tokenToString = localStorage.getItem("designation");
  //   const token = JSON.parse(tokenToString);
  //   return token;
  // };

  // const history = useHistory();
  const [currentUser, setCurrentUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  // console.log(getToken());

  // const value = useMemo(
  //   () => ({ currentUser, setCurrentUser }),
  //   [currentUser, setCurrentUser]
  // );
  // const {token,setToken} = useToken()
  // if(!token){
  //    setToken(<Redirect to={Login} />)
  // }
  const body = document.querySelector("body");

  width >= 1300
    ? body.setAttribute("data-sidebar-style", "full")
    : width <= 1299 && width >= 767
    ? body.setAttribute("data-sidebar-style", "mini")
    : body.setAttribute("data-sidebar-style", "overlay");
  return (
    <Fragment>
      <UserContext.Provider value={{ currentUser, setCurrentUser }}>
        <RoleContext.Provider value={{ userRole, setUserRole }}>
          <Markup />
          );
          {/* {currentUser ? <Markup /> :null} */}
        </RoleContext.Provider>
      </UserContext.Provider>
    </Fragment>
  );
};

export default withResizeDetector(App);
