import React, { Component } from 'react';
import styled from 'styled-components';
import { string } from 'prop-types';
import { Flex } from 'rimble-ui'

const TabWrapper = styled(Flex)`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 0px 4px;
`

const StyledTab = styled.span`
  padding: 8px 12px;
  border-radius: 100px;
  background: ${props => (props.active ? 'var(--color-primary)' : 'var(--color-secondary)')};
  color: ${props => (props.active ? 'var(--color-tertiary)' : 'var(--color-primary)')};
  font-size: 18px;
  min-width: 160px;
  text-align: center;
`;

const ChildWrapper = styled(Flex)`
  flex-direction: column;
  flex: 1;
`

interface TabProps {
  title: string;
  default?: boolean;
}

interface TabItemProps {
  title: string;
  onClick: Function;
  active?: boolean;
}

interface TabsProps {
  children: React.ReactNodeArray;
}

// Renderless tab item
const Tab: React.FC<TabProps> = () => null;

const TabItem: React.FC<TabItemProps> = ({ title, active, onClick }) => (
  <StyledTab active={active} onClick={onClick}>
    {title}
  </StyledTab>
);

class Tabs extends Component<TabsProps> {
  constructor(props: TabsProps) {
    super(props);

    // const filterToActiveTab = props.children.filter(item => item.props.default);
    // const arrayToObject = (arr, keyField) =>
    //   Object.assign({}, ...arr.map(item => ({ [item[keyField]]: item })));
    // const newObj = arrayToObject(props.children, 'title');

    const newProps = Object.assign(
      {},
      ...props.children.map(item => ({
        [item.props.title]: {
          title: item.props.title,
          props: item.props,
          children: item.props.children,
          active: item.props.default
        }
      }))
    );

    const active = props.children.filter(prop => prop.props.default == true);

    this.state = {
      active: active[0].props.title || props.children[0].props.title || null,
      items: newProps
    };
  }

  switchTab = title => {
    this.setState({ active: title });
  };

  render() {
    const { active } = this.state;
    const child = this.state.items[active].children;
    return (
      <TabWrapper>
        <Flex justifyContent="space-between" pt={3} pb={3}>
          {this.props.children.map(item => {
            return (
              <TabItem
                key={item.props.title}
                active={item.props.title == this.state.active ? true : false}
                title={item.props.title}
                onClick={() => this.switchTab(item.props.title)}
              />
            );
          })}
        </Flex>

        <ChildWrapper>
          {child}
        </ChildWrapper>
      </TabWrapper>
    );
  }
}

export { Tab };
export default Tabs;
