// @ts-ignore
import React from "react";
import { Account } from "../../";

import styled from "styled-components";

const StyledAccount = styled.div`
  display: flex;
  flex: 1 0;
  padding-left: 8px;
  cursor: default;
  height: 40px;
  overflow: hidden;
`;

const StyledAvatar = styled.div`
  height: 30px;
  width: 30px;
  background-image: url(${props => props.picture});
  background-size: cover;
`;

const StyledNames = styled.div`
  flex: 1 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
`;

const StyledTitle = styled.div`
  text-overflow: ellipsis;
  overflow: hidden;
`;

const StyledSubtitle = styled.div`
  color: #555555;
  text-overflow: ellipsis;
  overflow: hidden;
`;

const AddressInputAccount: React.FC<{ account: Account }> = ({ account }) => (
  <StyledAccount>
    {account.picture && <StyledAvatar />}
    <StyledNames>
      <StyledTitle>{account.name || account.address}</StyledTitle>
      {account.name && <StyledSubtitle>{account.address}</StyledSubtitle>}
    </StyledNames>
  </StyledAccount>
);

export default AddressInputAccount;
