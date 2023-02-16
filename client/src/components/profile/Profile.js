import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getUser } from "../../features/user/userSlice";
import { ProfileBanner } from "./ProfileBanner";
import { ProfileContent } from "./ProfileContent";
import { ProfilePins } from "./ProfilePins";

export function Profile(props) {
  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state.user);
  const { id } = useParams();

  React.useState(() => {
    dispatch(getUser(id));
  });

  return (
    <>
      <ProfileBanner profile={profile} />
      <ProfilePins />
      <ProfileContent profile={profile} />
    </>
  );
}
