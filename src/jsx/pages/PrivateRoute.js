import React from "react";
import { Redirect, Route } from "react-router";
import { useUserContext } from "../../context/user_context";
const PrivateRoute = ({ children, ...rest }) => {
  const { myUser } = useUserContext();
  return (
    <Route
      {...rest}
      render={() =>
        // if (isAuthProtected && !myUser) {
        //   return <Redirect to="/" />;
        // }
        // if (myUser && !isAuthProtected) {
        //   return children;
        // }
        myUser ? children : <Redirect to="/" />
      }
    ></Route>
  );
};

export default PrivateRoute;
