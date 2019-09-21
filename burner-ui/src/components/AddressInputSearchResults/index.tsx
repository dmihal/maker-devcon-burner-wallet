// @ts-ignore
import React from "react";
import styled from "styled-components";
import { Account } from "../../";
import AddressInputAccount from "../AddressInputAccount";

interface AddressInputSearchResultsProps {
  accounts: Account[];
  onSelect: (account: Account) => void;
}

const Results = styled.div`
  max-height: 100px;
  overflow-y: auto;
  border: solid 1px #eeeeee;
  border-bottom-right-radius: 3px;
  border-bottom-left-radius: 3px;
  margin-bottom: 10px;
`;

const ResultsList = styled.ul`
  margin: 0;
  padding: 0;
`;

const ListItem = styled.li`
  list-style: none;
  padding: 1px 0;
  margin: 1px;
  border-bottom: solid 1px #eeeeee;
  ${props =>
    props.enabled
      ? `
    color: #000000;
    &:hover: {
      background: #EEEEEE;
    }
  `
      : `
    color: #777777";
  `}
`;

const AddressInputSearchResults: React.FC<AddressInputSearchResultsProps> = ({
  accounts,
  onSelect
}) => (
  <Results>
    <ResultsList>
      {accounts.map(account => (
        <ListItem
          enabled={account.address && true}
          onClick={() => account.address && onSelect(account)}
          key={account.address || account.name}
        >
          <AddressInputAccount account={account} />
        </ListItem>
      ))}
    </ResultsList>
  </Results>
);

export default AddressInputSearchResults;
