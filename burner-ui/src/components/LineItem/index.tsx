// @ts-ignore
import React from "react";
import styled from "styled-components";

const Line = styled.div`
  margin: 8px 0;
`;

const TextLineName = styled.div`
  font-size: 18px;
  font-weight: bold;
`;

const TextLineValue = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 20px;
  max-width: 240px;
`;

interface LineItemProps {
  name: string;
  value: string;
  classes?: any;
}

const LineItem: React.FC<LineItemProps> = ({ name, value, classes }) => (
  <Line>
    <TextLineName>{name}</TextLineName>
    <TextLineValue>{value}</TextLineValue>
  </Line>
);

export default LineItem;
