// @ts-ignore
import React, { Fragment, ComponentType } from "react";
import { PluginButtonData } from "../Plugins";
import { withBurner, BurnerContext } from "../BurnerProvider";

export interface PluginButtonsProps {
  position: string;
  component: ComponentType;
}

const PluginButtons: React.FC<PluginButtonsProps & BurnerContext> = ({
  position,
  component,
  pluginData,
  ...props
}) => {
  const elements = pluginData.buttons[position];
  if (!elements || elements.length === 0) {
    return null;
  }

  const Component = component;

  return (
    <Fragment>
      {elements.map(({ title, path, options }: PluginButtonData, i: number) => (
        <Component key={i} title={title} path={path} {...options} {...props} />
      ))}
    </Fragment>
  );
};

export default withBurner<PluginButtonsProps & BurnerContext>(PluginButtons);
