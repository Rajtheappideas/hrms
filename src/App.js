import React, { Fragment, useMemo, useState } from "react";

/// Style
import "./css/style.css";
import "./vendor/bootstrap-select/dist/css/bootstrap-select.min.css";

/// react-resize
import { withResizeDetector } from "react-resize-detector";

/// components
import Routing from "./jsx";
// import { authRoute, userRoute } from "./jsx";
// import PrivateRoute from "./jsx/pages/PrivateRoute";
// import Nav from "./jsx/layouts/nav/NavHader";
// import Footer from "./jsx/layouts/Footer";

/// context
import { UserProvider } from "./context/user_context";

const App = ({ width }) => {
  // const getToken = () => {
  //   const tokenToString = localStorage.getItem("designation");
  //   const token = JSON.parse(tokenToString);
  //   return token;
  // };

  // const history = useHistory();
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
      <UserProvider>
        <Routing />
      </UserProvider>
      );
    </Fragment>
  );
};

export default withResizeDetector(App);
