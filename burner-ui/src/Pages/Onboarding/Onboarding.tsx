import React, { Component } from 'react';
import { Flex, Box, Button, Input } from 'rimble-ui';
import Text from '../../components/Text';
import styled, { createGlobalStyle } from 'styled-components';
import { Redirect } from 'react-router-dom';

const H1 = styled.h1`
  font-weight: 600;
  font-size: 3.3ch;
`;

const P = styled.p`
  font-weight: 400;
  font-size: 2.1ch;
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

const BigEmoji = styled.div`
  font-size: 110px;
  text-align: center;
  animation: bounce 2s infinite;
  -webkit-animation: bounce 2s infinite;
  -moz-animation: bounce 2s infinite;
  -o-animation: bounce 2s infinite;
`;

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
          Claim your <br />
          burner wallet
        </H1>
        <P>
          Your burner wallet is browser-based &amp; built specifically to use
          with different vendors at events here.
        </P>
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
          Claim your <br />
          burner wallet
        </H1>
        <P>
          Remember not to clear your cache, otherwise you could lose your
          wallet.
        </P>
      </Box>
      <KeyboardAwareBox marginTop='auto'>
        <Input width={'100%'} placeholder={'Give your wallet a name'} />
        <Button
          width='100%'
          children='Create wallet &amp; claim funds!'
          mb={0}
          mt={12}
          onClick={() => next()}
        />
      </KeyboardAwareBox>
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
