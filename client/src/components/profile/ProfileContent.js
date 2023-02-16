import { DYOMBox } from "../../styles/components/DYOMBox";
import { DYOMButton } from "../../styles/components/DYOMButton";
import { DYOMContent } from "../../styles/components/DYOMContainer";
import React from "react";

export function ProfileContent(props) {
  const [value, setValue] = React.useState("0");

  const handleClick = (e) => {
    setValue(e.currentTarget.id);
  };

  return (
    <DYOMContent>
      <DYOMBox center>
        <DYOMButton componentId="0" onClick={handleClick} checked>
          About me
        </DYOMButton>
        <DYOMButton componentId="1" onClick={handleClick}>
          Projects
        </DYOMButton>
        <DYOMButton componentId="2" onClick={handleClick}>
          Comments
        </DYOMButton>
        <DYOMButton componentId="3" onClick={handleClick}>
          Activity
        </DYOMButton>
      </DYOMBox>
      <Content value={value} />
    </DYOMContent>
  );
}

function Content(props) {
  switch (props.value) {
    case "0":
      // About me
      return null;
    case "1":
      // Projects
      return null;
    case "2":
      // Comments
      return null;
    case "3":
      // Activity
      return null;
    default:
      return null;
  }
}
