// @ts-ignore
import React, { useRef, useState, Fragment, Component } from 'react';
import QrReader from 'react-qr-reader';
import { withRouter, Redirect, Link } from 'react-router-dom';
import { withBurner, BurnerContext } from '../../BurnerProvider';
import styled from 'styled-components';
import { Box, Flex, Text, Card, Button, Portal } from 'rimble-ui';
import { ModalBackdrop, ModalCard } from '../Modal';

const CameraIcon = styled.svg`
  flex: 1;
`;

const ReaderContainer = styled(Card)`
  width: 75%;
  margin: 0 auto;
  overflow: 'hidden';
`;

const Reader = styled(QrReader)`
  flex: '1 0';
  background: pink;
  & > section > div {
    border: 20px solid rgba(78, 63, 206, 0.2) !important;
    box-shadow: rgba(78, 63, 206, 0.7) 0px 0px 0px 5px inset !important;
  }
`;

const isAddress = to => {
  const ADDRESS_REGEX = /^(?:0x)?[0-9a-f]{40}$/i;
  return ADDRESS_REGEX.test(to);
};

const domain =
  location.protocol +
  '//' +
  location.hostname +
  (location.port ? ':' + location.port : '');

interface Location {
  state: object;
}

interface ScannerProps {
  location: {
    state: {
      backTo: string | null | false;
    };
  };
  history: object;
}

const scan = contents => {
  console.log(contents, contents && contents.replace(/https?:\/\/[^\/]+/i, ''));
  isAddress(contents) ? (
    <Redirect to={`/send/${contents}`} />
  ) : (
    contents && <Redirect to={contents.replace(/https?:\/\/[^\/]+/i, '')} />
  );
};

interface ScannerState {
  cameraEnabled?: boolean;
}

class Scanner extends Component<ScannerProps, ScannerState> {
  constructor(props: ScannerProps & ScannerState) {
    super(props);
    this.state = {
      cameraEnabled: true
    };
  }

  render() {
    console.log(this.props.location.state);
    // const { children, history, location } = this.props;
    return (
      <Portal>
        <ModalBackdrop>
          <ModalCard
            title='Send'
            backTo={
              this.props.location.state ? this.props.location.state.backTo : ''
            }
          >
            <Box padding={'24px var(--page-margin)'} width={1}></Box>
            <Text level={3} as='h2' margin='0 0 16px 0'>
              Place the QR code within the scanner
            </Text>

            <Flex alignItems='center' justifyContent='center' width={1}>
              {this.state.cameraEnabled ? (
                <ReaderContainer>
                  <Reader
                    delay={300}
                    legacyMode={!this.state.cameraEnabled}
                    onError={err => {
                      this.setState({ cameraEnabled: false });
                    }}
                    onScan={contents => {
                      // TO DO: HANDLE DIFFERENT SCENARIOS.
                      contents &&
                        (isAddress(contents)
                          ? (window.location.href = `${domain}/send/${contents}`)
                          : (window.location.href = `${domain}${contents.replace(
                              /https?:\/\/[^\/]+/i,
                              ''
                            )}`));
                    }}
                  />
                </ReaderContainer>
              ) : (
                <Fragment>
                  {/* <TextInstruction>Take a photo of a QR code</TextInstruction>
                        <CameraIconContainer
                          onClick={() => reader.current!.openImageDialog()}
                        > */}
                  <CameraIcon viewBox='0 0 24 24'>
                    <path
                      fill='#ffffff'
                      d='M4,4H7L9,2H15L17,4H20A2,2 0 0,1 22,6V18A2,2 0 0,1 20,20H4A2,2 0 0,1 2,18V6A2,2 0 0,1 4,4M12,7A5,5 0 0,0 7,12A5,5 0 0,0 12,17A5,5 0 0,0 17,12A5,5 0 0,0 12,7M12,9A3,3 0 0,1 15,12A3,3 0 0,1 12,15A3,3 0 0,1 9,12A3,3 0 0,1 12,9Z'
                    />
                  </CameraIcon>
                  {/* </CameraIconContainer> */}
                </Fragment>
              )}
            </Flex>
          </ModalCard>
          <Flex width={1} pt={16}>
            {/* Persist close button */}
            <Button as={Link} to='/' style={{ width: '30%' }}>
              Close
            </Button>
          </Flex>
        </ModalBackdrop>
      </Portal>
    );
  }
}

export default withRouter(Scanner);
