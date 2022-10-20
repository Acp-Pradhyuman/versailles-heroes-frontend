import React from "react";
import { Switch } from "react-router-dom";
import { GuestRoute } from "./GuestRoute";
import * as Routes from "../pages";
import { HelpCenter, ContactUs, PopularQuestions, MarketPlace, Notifications, AllHeros } from "../pages";
import { MysteryBoxes, WeaponDetails, AvatarDetails, UpgradeAvatar } from "../components";


export const CustomRouter = () => {
  return (

    <Switch>
      <GuestRoute path="/marketplace" component={MarketPlace} />
      <GuestRoute path="/mystery-boxes/:id" component={MysteryBoxes} />
      <GuestRoute path="/help-center" component={HelpCenter} />
      <GuestRoute path="/contact-us" component={ContactUs} />
      <GuestRoute path="/popular-questions" component={PopularQuestions} />
      <GuestRoute path="/weapon-details/:id" component={WeaponDetails} />
      <GuestRoute path="/avatar-details/:id" component={AvatarDetails} />
      <GuestRoute path="/notifications" component={Notifications} />
      <GuestRoute path="/allHeros" component={AllHeros} />
      <GuestRoute path="/upgrade-avatar/:id/:name" component={UpgradeAvatar} />
      <GuestRoute path="/" exact component={Routes.Home} />
    </Switch>
  );
};
