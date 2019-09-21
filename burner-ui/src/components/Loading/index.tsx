// @ts-ignore
import React from "react";
import styled from "styled-components";
import { withBurner, BurnerContext } from "../../BurnerProvider";
import Overlay from "../Overlay";

const StyledOverlay = styled(Overlay)`
  align-items: center;
  color: white;
  justify-content: center;
  font-size: 32;
`;

const Loading: React.FC<BurnerContext & { classes: any }> = ({ loading }) => {
  if (!loading) {
    return null;
  }

  return <StyledOverlay>>{loading}</StyledOverlay>;
};

export default withBurner(Loading);
