// @ts-ignore
import React, { useRef, useState, Fragment } from 'react';
import QrReader from 'react-qr-reader';
import { withBurner, BurnerContext } from '../../BurnerProvider';
import styled from 'styled-components';
import { Box, Flex, Card, Button, Portal } from 'rimble-ui';
import Text from '../../components/Text';

const ModalBackdrop = styled(Box)`
  & {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 9999;
    height: ${window.innerHeight};
    width: 100vw;
    display: flex;
    flex-direction: column;
  }
`;

const PurpleCard = styled(Card)`
  background-color: var(--modal-header-background);
  height: 100%;
  flex: 1;
  margin-bottom: var(--page-margin);
`;

ModalBackdrop.defaultProps = {
  bg: 'blacks.10',
  p: 3
};

const TextInstruction = styled.div`
  text-align: center;
  color: #eeeeee;
  font-size: 16px;
  margin-top: 16px;
`;

const CameraIconContainer = styled(Card)`
  display: flex;
  padding: 12px;
  margin: 12px auto;
  width: 140px;
  border-radius: 15px;
  height: 90px
`;

const CameraIcon = styled.svg`
  flex: 1;
`;

const ReaderContainer = styled.div`
  overflow: 'hidden';
`;

const Reader = styled(QrReader)`
  flex: '1 0';
`;

ModalBackdrop.defaultProps = {
  bg: 'blacks.10',
  p: 3
};

const Scanner: React.FC<BurnerContext & { classes: any }> = ({
  children,
  completeScan,
  classes
}) => {
  const reader = useRef<any>(null);
  const [fallback, setFallback] = useState(false);

  if (!completeScan) {
    return null;
  }
  const colors = {
    foreground: 'black',
    background: 'white'
  };

  return (
    <Portal>
      <ModalBackdrop>
        <Card
          bg={colors.background}
          color={colors.foreground}
          border={'none'}
          borderRadius={2}
          p={0}
          display={'flex'}
          flexDirection={'column'}
          justifyContent={'flex-start'}
          alignContent={'flex-start'}
          flex={'1'}
        >
        <Flex alignItems={'center'} p={3} pb={0}>
          <Text
            level={1}
            as={'h1'}
            left
          >
          Scan
          </Text>
          </Flex>

          <Box p={[3, 4]} pt={0} overflow={'scroll'}>
            <Text level={3} color={'inherit'} left margin={'0'} >
              Place the QR code within the scanner
            </Text>
            <Box
              // size={['100%', '200px']}
              width={1}
              // maxWidth={'220px'}
              mx={'auto'}
              mt={4}
              mb={4}
              p={3}
              bg={'white'}
              border={1}
              borderColor={'blacks.3'}
              // boxShadow={2}
              borderRadius={2}
            >
              {fallback && (
                <Fragment>
                  <Text>Take a photo of a QR code</Text>
                  <CameraIconContainer
                    onClick={() => reader.current!.openImageDialog()}
                  >
                    <CameraIcon viewBox='0 0 24 24'>
                      <path
                        fill='#333333'
                        d='M4,4H7L9,2H15L17,4H20A2,2 0 0,1 22,6V18A2,2 0 0,1 20,20H4A2,2 0 0,1 2,18V6A2,2 0 0,1 4,4M12,7A5,5 0 0,0 7,12A5,5 0 0,0 12,17A5,5 0 0,0 17,12A5,5 0 0,0 12,7M12,9A3,3 0 0,1 15,12A3,3 0 0,1 12,15A3,3 0 0,1 9,12A3,3 0 0,1 12,9Z'
                      />
                    </CameraIcon>
                  </CameraIconContainer>
                </Fragment>
              )}

              <ReaderContainer>
                <Reader
                  delay={300}
                  ref={reader}
                  legacyMode={fallback}
                  onError={err => {
                    console.error(err);
                    setFallback(true);
                  }}
                  onScan={address => {
                    if (address) {
                      completeScan(address);
                    }
                  }}
                />
              </ReaderContainer>
            </Box>
          </Box>
        </Card>
        <Box position={'relative'} width={'100%'} my={2} backgroundColor={'transparent'}>
        <Button
          width={'100%'}
          p={0}
          borderRadius={1}
          positionSelf={'center'}
          backgroundColor={'var(--color-primary)'}
          onClick={() => completeScan(null)}
          boxShadow={2}
        >
        Close
        </Button>
        </Box>
      </ModalBackdrop>
    </Portal>
  );
};

export default withBurner(Scanner);
