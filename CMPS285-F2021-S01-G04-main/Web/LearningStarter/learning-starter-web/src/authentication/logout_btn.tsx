import React from "react";
import { Button } from "semantic-ui-react";
import { logoutUser } from "./authentication-services";
import '../components/navbar/navbar.css'
export const LogoutButton = () => {

  return (
    <>
      <Button className="button" onClick={async () => {
        logoutUser();
      }} >
        Sign Out
      </Button>
    </>
  )
};