import React from 'react';
import ching from './ching.jpg';
import maker from './maker.png';
import factory from './factory.png';
import rimble from './rimblelogo.png'

const projects = [
  {
    name: 'MakerDAO',
    description: 'Builders of Dai, the first fully-decentralized stablecoin on Ethereum.',
    domain: 'makerdao.com',
    image: maker,
  },
  {
    name: 'Burner Factory',
    description: 'Easily create and deploy customized burner wallets.',
    domain: 'burnerfactory.com',
    image: factory,
  },
  {
    name: 'Rimble',
    description: 'An open-source library of React components and guides to help you make dApps everyone can use.',
    domain: 'rimble.consensys.design',
    image: rimble,
  },
  {
    name: 'Ching',
    description: 'Ching! is the easiest way to sell a thing. Make your own store at:',
    domain: 'app.ching.store',
    image: ching,
  },
  {
    name: 'Sablier',
    description: 'Sablier is a decentralised app for continuous salaries on Ethereum.',
    domain: 'sablier.app',
    image: 'https://pbs.twimg.com/profile_images/1163480930910199809/nlJtmWT1_400x400.jpg',
  }
];

const AboutPage = ({ burnerComponents }) => {
  const { Page } = burnerComponents;
  return (
    <Page title="About" back>
      {projects.map(({ name, image, description, domain }) => (
        <div key={name} style={{ display: 'flex', margin: '20px 10px' }}>
          <div style={{
            minWidth: '50px',
            margin: '8px',
            backgroundImage: `url(${image})`,
            backgroundPosition: 'center',
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
          }} />
          <div>
            <div style={{ fontSize: '18px', fontWeight: '600' }}>{name}</div>
            <div>{description}</div>
            <div><a href={`https://${domain}/`} target="_blank">{domain}</a></div>
          </div>
        </div>
      ))}
    </Page>
  );
}


class SablierPlugin {
  initializePlugin(pluginContext) {
    pluginContext.addPage("/about", AboutPage);
    pluginContext.addButton("apps", "About", "/about", {
      description: 'Learn about the projects supporting this wallet.',
    });
  }
}

export default SablierPlugin;
