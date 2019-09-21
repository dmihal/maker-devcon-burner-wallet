// @ts-ignore
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Asset } from "@burner-wallet/assets";
import AccountBalance, {
  AccountBalanceData
} from "../../data-providers/AccountBalance";
import Assets from "../../data-providers/Assets";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 4px 12px;
  flex: 1 0;
  cursor: default;
`;

const TextAssetName = styled.div`
  flex: 1 0;
  font-size: 24px;
`;

const TextAssetBalance = styled.div`
  font-size: 18px;
  color: #999;
`;

const SelectWrapper = styled.div`
  position: relative;
  margin: 4px 0;
`;

const Selected = styled.div`
  padding: 6px;
  border: solid 1px #cccccc;
  border-radius: 4px;
  display: flex;
  align-items: center;
  &:after {
    content: "\25be";
    margin: 4px;
    color: #555;
    display: block;
  }
`;

const ItemWrapper = styled.div`
  position: absolute;
  background: white;
  left: 0;
  right: 0;
  padding: 6px;
  box-shadow: 0px 3px 5px 0px #0000008a;
  border-radius: 4px;
  z-index: 10;
  &:hover {
    background: #efefef;
  }
`;

const Item = styled.div`
  &:hover {
    background: #eee;
  }
`;

const AssetElement: React.FC<{ asset: Asset }> = ({ asset }) => (
  <Wrapper>
    <TextAssetName>{asset.name}</TextAssetName>
    <AccountBalance
      asset={asset}
      render={(err: Error, data: AccountBalanceData | null) =>
        data && (
          <TextAssetBalance>
            {data.usdBalance ? `$${data.usdBalance}` : data.displayBalance}
          </TextAssetBalance>
        )
      }
    />
  </Wrapper>
);

export interface AssetSelectorProps {
  selected: Asset | null;
  assets?: Asset[];
  onChange: (asset: Asset) => void;
  network?: string;
  disabled?: boolean;
}

const AssetSelector: React.FC<AssetSelectorProps> = ({
  selected,
  assets,
  onChange,
  disabled,
  network
}) => {
  const [isOpen, setOpen] = useState(false);

  useEffect(() => {
    const clickListener = () => setOpen(false);
    document.addEventListener("click", clickListener);
    return () => document.removeEventListener("click", clickListener);
  });

  const Dropdown = (assets: Asset[]) => {
    if (!selected) {
      onChange(assets[0]);
    }
    const selectedAsset = assets.filter(asset => asset === selected)[0];
    return (
      <SelectWrapper>
        <Selected onClick={() => setOpen(!isOpen)}>
          {selectedAsset && <AssetElement asset={selectedAsset} />}
        </Selected>
        {isOpen && !disabled && (
          <ItemWrapper>
            {assets
              .filter(asset => !network || asset.network === network)
              .map(asset => (
                <Item
                  key={asset.id}
                  onClick={() => {
                    setOpen(false);
                    onChange(asset);
                  }}
                >
                  <AssetElement asset={asset} />
                </Item>
              ))}
          </ItemWrapper>
        )}
      </SelectWrapper>
    );
  };

  return assets ? Dropdown(assets) : <Assets render={Dropdown} />;
};

export default AssetSelector;
