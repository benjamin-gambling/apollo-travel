import React from "react";
import styled from "react-emotion";

import { unit } from "../styles";
import {
  cardClassName,
  getBackgroundImage,
  LaunchTimeClass,
} from "./launch-tile";

const LaunchDetail: React.FC<any> = ({ id, site, rocket, time }: any) => (
  <Card
    style={{
      backgroundImage: getBackgroundImage(id as string),
    }}
  >
    <div>
      <h3>
        {rocket && rocket.name} ({rocket && rocket.type})
      </h3>
      <h5>{site}</h5>
    </div>

    <h5 className={LaunchTimeClass}>{`${new Date(+time * 1000)}`}</h5>
  </Card>
);

/**
 * STYLED COMPONENTS USED IN THIS FILE ARE BELOW HERE
 */

const Card = styled("div")(cardClassName, {
  display: "flex",
  flexDirection: "column",
  height: 365,
  marginBottom: unit * 4,
  justifyContent: "space-between",
});

export default LaunchDetail;
