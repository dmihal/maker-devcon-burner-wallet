// @ts-ignore
import React from "react";
import styled from "styled-components";

const Overlay = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.5);
  padding: 16px;
  display: flex;
  flex-direction: column;
  z-index: 100;
`;

export default Overlay;
