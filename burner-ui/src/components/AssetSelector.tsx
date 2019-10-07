// @ts-ignore
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Asset } from "@burner-wallet/assets";
import AccountBalance, {
  AccountBalanceData
} from "../data-providers/AccountBalance";
import Assets from "../data-providers/Assets";
import Text from '../components/Text';


const TextAssetName = styled(Text)`
  font-size: 18px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin: 0px;
`;

const TextAssetBalance = styled(Text)`
  color: #777;
  margin: 0px 8px;
`;

const SelectWrapper = styled.div`
  position: relative;
  align-self: stretch;
  margin: 8px;
  background: #fff;
`;

const TextContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 10px 16px;
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
  width: 50%;
  background: #CAC4FF;
`;

const AssetContainer = styled.div`
  cursor: default;
  display: flex;
  padding: 8px;
  justify-content: space-between;
  align-items: center;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  flex: 1;
`;

const Selected = styled.div`
  padding: 4px;
  border: solid 1px #cccccc;
  border-radius: 4px;
  display: flex;
  align-items: center;

  &:after {
    content: "\\25be";
    margin: 4px;
    color: #555;
    display: block;
  }
`;

const ItemWrapper = styled.div`
  position: absolute;
  background: white;
  width: 100%;
  left: 0;
  right: 0;
  padding: 6px;
  border-radius: 4px;
  z-index: 10;
  box-shadow: 0px 8px 16px rgba(0,0,0,0.2);
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
  <AssetContainer>
    <TextAssetName level={3} as="p">{asset.name}</TextAssetName>
    <AccountBalance
      asset={asset}
      render={(data: AccountBalanceData | null) =>
        data && (
          <TextAssetBalance level={4} as="p" margin={0} color={999999}>
            {data.usdBalance ? `$${data.usdBalance}` : data.displayBalance}
          </TextAssetBalance>
        )
      }
    />
  </AssetContainer>
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
