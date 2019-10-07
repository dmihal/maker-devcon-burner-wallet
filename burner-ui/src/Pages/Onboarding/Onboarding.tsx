import React, { Component } from 'react';
import { Flex, Box, Button, Input, Image } from 'rimble-ui';
import Text from '../../components/Text';
import styled, { createGlobalStyle } from 'styled-components';
import { Redirect } from 'react-router-dom';
import BurnerBoiPeace from '../../static/burnerboipeace.svg';
import Daibot from '../../static/daibot.svg';


const Headline = styled(Text)`
font-size: 2.25rem;
font-weight: 600;
`

const H1 = styled.h1`
  font-weight: 600;
  font-size: 3.3ch;
  margin: 0;
  color: ${props => props.color}
`;


const OnboardingImage = styled(Image)`
position: absolute;
z-index: -999;
`


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
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect x="4" y="4" width="72" height="72" rx="36" fill="url(#paint0_linear)"/>
  <path d="M36.222 54.9477C35.1892 54.9477 34.4281 54.2083 34.4281 53.2576V39.8946L19.5878 29.9649V53.2576C19.5878 54.2083 18.7724 54.9477 17.7939 54.9477C16.8154 54.9477 16 54.2083 16 53.2576V26.6902C16 25.7394 16.8154 25 17.7939 25C18.1744 25 18.5549 25.1056 18.8267 25.3169L37.2549 37.7291C37.7441 38.046 38.0159 38.5214 38.0159 39.1024V53.3104C38.0159 54.2083 37.2005 54.9477 36.222 54.9477Z" fill="#1AAB9B"/>
  <path d="M43.7783 54.9474C42.7454 54.9474 41.9844 54.2079 41.9844 53.2572V39.102C41.9844 38.5739 42.3105 38.0457 42.7454 37.7288L61.1736 25.3694C61.4997 25.1581 61.8259 25.0525 62.2064 25.0525C63.0762 25.0525 64.0003 25.6863 64.0003 26.7427V53.31C64.0003 54.2608 63.1849 55.0002 62.2064 55.0002C61.2279 55.0002 60.4125 54.2608 60.4125 53.31V30.0174L45.5722 39.8943V53.2572C45.5722 54.2079 44.7567 54.9474 43.7783 54.9474Z" fill="#1AAB9B"/>
  <defs>
  <linearGradient id="paint0_linear" x1="40" y1="4" x2="40" y2="76" gradientUnits="userSpaceOnUse">
  <stop stop-color="#B6EDE7" stop-opacity="0.38"/>
  <stop offset="1" stop-color="#FDC134" stop-opacity="0.15"/>
  </linearGradient>
  </defs>
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
      <OnboardingImage src={BurnerBoiPeace}
      top={'-0'}
      right={'-80px'}/>
      <MakerLogo />
        <Headline>
          Welcome <br /> to Devcon
        </Headline>
        <Text level={2} as="p" color="#444">If you are in incognito mode, please enter regular browsing mode.</Text>
      </Box>
      <Button
        width='100%'
        children="I'm in regular browsing mode"
        mb={0}
        mt={0}
        onClick={() => next()}
        mainColor="var(--color-primary)"
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
    <Box>
    <OnboardingImage src={Daibot}
    top={'-120px'}
    left='0px'
    />
      <Headline>
        What can you do?
      </Headline>
      <Text level={2} color="#444" as='p'>
        <IcoArrow>{'\u2192'}</IcoArrow>Find and scan physical Dai tokens to load up on xDai
      </Text>
      <Text level={2} color="#444" as='p'>
        <IcoArrow>{'\u2192'}</IcoArrow>Use your xDai to buy swag from the Maker booth.
      </Text>
      <Text level={2} color="#444" as='p'>
        <IcoArrow>{'\u2192'}</IcoArrow>Look for special QR codes scattered around Devcon to get rare NFTs
      </Text>
    </Box>
    <Button
      width='100%'
      children="Create Wallet"
      mb={0}
      mt={0}
      onClick={() => next()}
      mainColor="var(--color-primary)"
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
      text: 'Reticulating splines'
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
        justifyContent='space-evenly'
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
