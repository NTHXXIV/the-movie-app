import React from "react";
import { useAuth } from "../contexts/AuthContext";
import "../style/userinformation.css";

function UserInformation() {
  const { currentUser } = useAuth();

  return (
    <div className="ui">
      <img
        className="ui__avatar"
        alt="userAvatar"
        src="https://i.imgur.com/MGOjQwh.jpeg"
      />
      <div className="ui__content">
        <p>{`${currentUser.email}`}</p>
        <p>My Favorite</p>
      </div>
    </div>
  );
}

export default UserInformation;
