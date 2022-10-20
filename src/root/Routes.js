import React from "react";
import { Switch, BrowserRouter } from "react-router-dom";
import { Layout } from "./Layout";
import { GuestRoute } from "./GuestRoute";


const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <GuestRoute path="/" component={Layout} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
