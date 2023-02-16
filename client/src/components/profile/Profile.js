import { ProfileBanner } from "./ProfileBanner";
import { ProfileContent } from "./ProfileContent";
import { ProfilePins } from "./ProfilePins";

export function Profile(props) {
  return (
    <>
      <ProfileBanner />
      <ProfilePins />
      <ProfileContent />
    </>
  );
}
