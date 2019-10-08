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

const CameraIconContainer = styled.div`
  display: flex;
  height: 100px;
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

const CloseButton = styled(Button)`
background: var(--color-primary);

  &:before {
    background: var(--color-primary);
  }
`

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
          </Flex>

          <Box p={[3, 4]} pt={0} overflow={'scroll'}>
            <Box
              // size={['100%', '200px']}
              width={1}
              // maxWidth={'220px'}
              mx={'auto'}
              mt={0}
              mb={4}
              p={3}
              bg={'white'}
              border={1}
              borderColor={'blacks.3'}
              // boxShadow={2}
              borderRadius={2}
            >

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
            <Text level={2} color={'inherit'} center margin={'0'} >
            { fallback ? 'Take a photo of the QR  code then tap the Upload button' : 'Place the QR code within the scanner'}
            </Text>
            {fallback && (
              <Flex my={4} justifyContent={'center'}>
              <Button mainColor={'var(--color-primary)'} onClick={() => reader.current!.openImageDialog()}>
              Upload QR Code
              </Button>
              </Flex>
            )}
          </Box>
        </Card>
        <Box position={'relative'} width={'100%'} my={2} backgroundColor={'transparent'}>
        <CloseButton
          width={'100%'}
          p={0}
          borderRadius={1}
          positionSelf={'center'}
          onClick={() => completeScan(null)}
          boxShadow={2}
        >
        Close
        </CloseButton>
        </Box>
      </ModalBackdrop>
    </Portal>
  );
};

export default withBurner(Scanner);
