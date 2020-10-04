import React from "react";
import styled, { css } from "react-emotion";
import { Link } from "@reach/router";

import galaxy from "../assets/images/galaxy.jpg";
import iss from "../assets/images/iss.jpg";
import moon from "../assets/images/moon.jpg";
import space from "../assets/images/space.jpg";
import space2 from "../assets/images/space2.jpg";
import space3 from "../assets/images/space3.jpg";
import space4 from "../assets/images/space4.jpg";
import space5 from "../assets/images/space5.jpg";
import space6 from "../assets/images/space6.jpg";
import space7 from "../assets/images/space7.jpg";
import space8 from "../assets/images/space8.jpg";

import { unit } from "../styles";

const backgrounds = [
  iss,
  galaxy,
  moon,
  space,
  space2,
  space3,
  space4,
  space5,
  space6,
  space7,
  space8,
];
export function getBackgroundImage(id: string) {
  return `url(${backgrounds[Number(id) % backgrounds.length]})`;
}

export default ({ launch }: any) => {
  const { id, mission, rocket } = launch;
  return (
    <StyledLink
      to={`/launch/${id}`}
      style={{
        backgroundImage: `linear-gradient(
          to bottom,
          rgba(0, 0, 0, 0.4),
          rgb(0, 0, 0, 0.1) 
        ), ${getBackgroundImage(id)}`,
      }}
    >
      <h3>{mission.name}</h3>
      <h5>{rocket.name}</h5>
    </StyledLink>
  );
};

/**
 * STYLED COMPONENTS USED IN THIS FILE ARE BELOW HERE
 */

export const cardClassName = css({
  padding: `${unit * 4}px ${unit * 5}px`,
  borderRadius: 7,
  color: "white",
  backgroundSize: "cover",
  backgroundPosition: "center",
});

const padding = unit * 2;
const StyledLink = styled(Link)(cardClassName, {
  display: "block",
  height: 193,
  marginTop: padding,
  textDecoration: "none",
  ":not(:last-child)": {
    marginBottom: padding * 2,
  },
});
