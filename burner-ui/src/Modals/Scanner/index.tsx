// @ts-ignore
import React, { useRef, useState, Fragment } from 'react';
import QrReader from 'react-qr-reader';
import { withBurner, BurnerContext } from '../../BurnerProvider';
import styled from 'styled-components';
import { Box, Flex, Text, Card, Button, Portal } from 'rimble-ui';

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
      <Text
        // color={'inherit'}
        // p={3}
        // borderBottom={1}
        // borderColor={'blacks.4'}
        // lineHeight={'solid'}
        // textAlign={'center'}
        fontWeight={3}
      >
        Scan Qr Code
      </Text>

      <Box p={[3, 4]} overflow={'scroll'}>
        <Text color={'inherit'} textAlign={'center'} mb={4}>
          Place the code within the scanner
        </Text>
        <Box
          // size={['100%', '200px']}
          width={1}
          maxWidth={'220px'}
          mx={'auto'}
          mb={4}
          p={4}
          bg={'white'}
          border={1}
          borderColor={'blacks.3'}
          boxShadow={2}
        >
          {fallback && (
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

          {/* <ReaderContainer>
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
              </ReaderContainer> */}
        </Box>
      </Box>
    </Portal>
  );
};

export default withBurner(Scanner);
