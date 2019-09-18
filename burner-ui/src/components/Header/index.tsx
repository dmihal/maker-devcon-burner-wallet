// @ts-ignore
import React from "react";
import styled from "styled-components";
import { withBurner, BurnerContext } from "../../BurnerProvider";

const HeaderStyled = styled.header`
  display: flex;
  color: white;
  height: 64px;
  align-items: center;
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const TextTitle = styled.div`
  font-size: 24px;
  font-family: ${props => props.theme.titleFont};
`;

const TextSubtitle = styled.div`
  font-size: 12px;
`;

const Spacer = styled.div`
  flex: 1 0;
`;

const TextLinkHeaderAccount = styled.div`
  font-size: 14;
  color: rgba(255, 255, 255, 0.7);
`;

interface HeaderProps extends BurnerContext {
  title?: string;
  classes: any;
}

const Header: React.FC<HeaderProps> = ({ accounts, title, actions }) => (
  <HeaderStyled>
    <TitleContainer>
      <TextTitle>{title}</TextTitle>
      {title !== "Burner Wallet" && (
        <TextSubtitle>Powered by Burner Wallet</TextSubtitle>
      )}
    </TitleContainer>
    <Spacer />
    <TextLinkHeaderAccount onClick={() => actions.navigateTo("/receive")}>
      {accounts.length > 0 && accounts[0].substr(2, 8)}
    </TextLinkHeaderAccount>
  </HeaderStyled>
);

Header.defaultProps = {
  title: "Burner Wallet"
};

export default withBurner(Header);
