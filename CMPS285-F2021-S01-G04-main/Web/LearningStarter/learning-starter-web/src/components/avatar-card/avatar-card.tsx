import React from "react";
import { Button } from "semantic-ui-react";
import { useUser } from "../../authentication/use-auth";
import './avatar-card.css';

export const Avatar = () => {
  const user = useUser();
  return (

    <>
      <div className="avatar">
        <img className="avatar-img"/>
        <h2>{user.firstName} </h2> <h2>{user.lastName}</h2>
      <p></p>
        <p></p>
        <p><Button className="avatar-button" ><a href="">Contact</a></Button></p> 
      </div>
    </>
  );
}

