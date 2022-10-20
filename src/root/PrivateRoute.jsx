import React from "react";
import { Route, Redirect } from "react-router-dom";
import { authenticationService } from "../core";

export const PrivateRoute = ({ component: Component, ...rest }) => {
  const isAuthenticated = Boolean(authenticationService.token);
  return (
    <Route
      {...rest}
      render={(props) => {
        if (!isAuthenticated) return <Redirect to="/sign-in" />;
        return <Component {...props} />;
      }}
    />
  );
};
