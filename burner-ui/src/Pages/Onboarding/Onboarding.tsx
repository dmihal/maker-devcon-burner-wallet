import React, { Component } from 'react';
import { Flex, Box, Button, Input } from 'rimble-ui';
import Text from '../../components/Text';
import styled, { createGlobalStyle } from 'styled-components';
import { Redirect } from 'react-router-dom';

const H1 = styled.h1`
  font-weight: 600;
  font-size: 3.3ch;
  margin: 0;
  color: ${props => props.color}
`;

const P = styled.p`
  font-weight: 400;
  font-size: 2.1ch;
  line-height: 140%;
`;


const LoadingWrapper = styled.div`
  animation: fadeInOut 2s;
  text-align: center;
`;

const KeyboardAwareBox = styled(Box)`
  &:has(input:focus) {
    background: pink;
  }
`;

const IcoArrow = styled.span`
display: inline-block;
margin-right: 8px;
color: var(--color-primary);
font-weight: 600;
`

const BigEmoji = styled.div`
  font-size: 110px;
  text-align: center;
  animation: bounce 2s infinite;
  -webkit-animation: bounce 2s infinite;
  -moz-animation: bounce 2s infinite;
  -o-animation: bounce 2s infinite;
`;

const MakerLogo = () => (
<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M21.4813 33.9651C20.7927 33.9651 20.2854 33.4721 20.2854 32.8383V23.9297L10.3918 17.3099V32.8383C10.3918 33.4721 9.84824 33.9651 9.19592 33.9651C8.5436 33.9651 8 33.4721 8 32.8383V15.1268C8 14.493 8.5436 14 9.19592 14C9.4496 14 9.70328 14.0704 9.88448 14.2113L22.1699 22.486C22.496 22.6973 22.6772 23.0142 22.6772 23.4015V32.8735C22.6772 33.4721 22.1336 33.9651 21.4813 33.9651Z" fill="#1AAB9B"/>
<path d="M26.5187 33.9648C25.8301 33.9648 25.3228 33.4718 25.3228 32.838V23.4012C25.3228 23.0491 25.5402 22.697 25.8301 22.4857L38.1155 14.2462C38.3329 14.1053 38.5504 14.0349 38.804 14.0349C39.3839 14.0349 40 14.4575 40 15.1617V32.8732C40 33.507 39.4564 34 38.804 34C38.1517 34 37.6081 33.507 37.6081 32.8732V17.3448L27.7146 23.9294V32.838C27.7146 33.4718 27.171 33.9648 26.5187 33.9648Z" fill="#1AAB9B"/>
</svg>
);

const BounceAnimation = createGlobalStyle`

  @keyframes fadeInOut{
    0% {opacity: 0;}
    20% {opacity: 1}
    80% {opacity: 1}
    100% {opacity: 0}
  }

  @keyframes fadeInOutLong{
    0% {opacity: 0;}
    10% {opacity: 1}
    90% {opacity: 1}
    100% {opacity: 0}
  }

  @-webkit-keyframes bounce {
    0%, 20%, 50%, 80%, 100% {-webkit-transform: translateY(0);}
    40% {-webkit-transform: translateY(-30px);}
    60% {-webkit-transform: translateY(-15px);}
  }

  @-moz-keyframes bounce {
    0%, 20%, 50%, 80%, 100% {-moz-transform: translateY(0);}
    40% {-moz-transform: translateY(-30px);}
    60% {-moz-transform: translateY(-15px);}
  }

  @-o-keyframes bounce {
    0%, 20%, 50%, 80%, 100% {-o-transform: translateY(0);}
    40% {-o-transform: translateY(-30px);}
    60% {-o-transform: translateY(-15px);}
  }
  @keyframes bounce {
    0%, 20%, 50%, 80%, 100% {transform: translateY(0);}
    40% {transform: translateY(-30px);}
    60% {transform: translateY(-15px);}
  }
`;
interface Step1Props {
  next: Function;
}

const Step1: React.FC<Step1Props> = ({ next }) => {
  return (
    <>
      <Box mt='auto' mb='auto'>
        <H1>
          Claim your
        </H1>
        <Flex alignItems={'center'} my={3}>
        <MakerLogo />
        <H1 margin={'0'} color={'var(--color-primary)'}>
        Maker
        </H1>
        </Flex>
        <H1>burner wallet
        </H1>
        <P>If you are in incognito mode, please enter regular browsing mode.</P>
      </Box>
      <Button
        width='100%'
        children="I'm in regular browsing mode"
        mb={0}
        mt={'auto'}
        onClick={() => next()}
      />
    </>
  );
};

interface Step2Props {
  next: Function;
}

const Step2: React.FC<Step2Props> = ({ next }) => {
  return (
    <>
    <Box mt='auto' mb='auto'>
      <H1>
        What can you do?
      </H1>
      <P>
        <IcoArrow>{'\u2192'}</IcoArrow>Find and scan physical Dai tokens to load up on xDai
      </P>
      <P>
        <IcoArrow>{'\u2192'}</IcoArrow>Use your xDai to buy swag from the Maker booth.
      </P>
      <P>
        <IcoArrow>{'\u2192'}</IcoArrow>Look for special QR codes scattered around Devcon to get rare NFTs
      </P>
    </Box>
    <Button
      width='100%'
      children="Create Wallet"
      mb={0}
      mt={'auto'}
      onClick={() => next()}
    />
    </>
  );
};

interface Step3Props {
  next: Function;
}

class Loading extends Component<Step3Props> {
  constructor(props: Step3Props) {
    super(props);
    this.state = {
      step: 1,
      show: true
    };
  }

  steps = {
    1: {
      emoji: '🥚',
      text: 'Creating your wallet'
    },
    2: {
      emoji: '🐣',
      text: 'Migrating your funds'
    },
    3: {
      emoji: '🐥',
      text: 'Ready to go!'
    }
  };

  componentDidMount() {
    let i;
    console.log(this.steps[this.state.step].emoji);
    setTimeout(() => {
      this.setState({ step: 2 });
      setTimeout(() => {
        this.setState({ step: 3 });
        setTimeout(() => {
          this.props.next();
        }, 4000);
      }, 2000);
    }, 2000);
  }

  render() {
    return (
      <Box mt='auto' mb='auto'>
        <LoadingWrapper>
          <BigEmoji>{this.steps[this.state.step].emoji}</BigEmoji>
          <Text level={1}>{this.steps[this.state.step].text}</Text>
        </LoadingWrapper>
      </Box>
    );
  }
}

interface OnboardingProps {
  privateKey?: string;
}

class Onboarding extends Component<OnboardingProps> {
  constructor(props: OnboardingProps) {
    super(props);
    this.state = {
      step: 1
    };
  }

  goToStep = step => {
    this.setState({
      step: step
    });
  };

  render() {
    return (
      <Flex
        padding={'var(--page-margin)'}
        minHeight={window.innerHeight}
        flexDirection='column'
      >
        <BounceAnimation />
        {this.state.step === 1 && <Step1 next={() => this.goToStep(2)} />}
        {this.state.step === 2 && <Step2 next={() => this.goToStep(3)} />}
        {this.state.step === 3 && <Loading next={() => this.goToStep(4)} />}
        {this.state.step === 4 && <Redirect to='/' />}
      </Flex>
    );
  }
}

export default Onboarding;
