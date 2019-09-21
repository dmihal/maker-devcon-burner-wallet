// @ts-ignore
import React from "react";
import styled from "styled-components";

const Line = styled.div`
  padding: 4px 0;
  margin: 4px 0;
  border-bottom: solid 1px #cccccc;
`;

const TextLineName = styled.div`
  font-size: 10;
  font-weight: bold;
`;

const TextLineValue = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
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
