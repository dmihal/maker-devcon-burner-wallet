import React, { useRef, useState, Fragment } from 'react';
import QrReader from 'react-qr-reader';
import { withBurner, BurnerContext } from '../../BurnerProvider';
import styled from 'styled-components';
import { Box, Flex, Card, Button, Portal } from 'rimble-ui';
import { ModalBackdrop, ModalCard } from '../Modals';
import Text from '../../components/Text';

const CameraIcon = styled.svg`
  flex: 1;
`;

const CameraIconContainer = styled.div`
  display: flex;
  height: 100px;
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

interface ScannerProps {
  backTo: { pathname: string; state: object } | string;
}

const Scanner: React.FC<BurnerContext & ScannerProps> = ({
  children,
  completeScan,
  backTo
}) => {
  const reader = useRef<any>(null);
  const [fallback, setFallback] = useState(false);

  if (!completeScan) {
    return null;
  }

  return (
    <Portal>
      <ModalBackdrop>
        <ModalCard title='Scan' backTo={backTo && backTo}>
          <Box padding={'24px var(--page-margin)'} width={1}></Box>
          <Text level={3} as='h2' margin='0 0 16px 0'>
            Place the QR code within the scanner
          </Text>

          <Flex alignItems='center' justifyContent='center' width={1}>
            {fallback && (
              <Fragment>
                <Text level={3}>Take a photo of a QR code</Text>
                <CameraIconContainer
                  onClick={() => reader.current!.openImageDialog()}
                >
                  <CameraIcon viewBox='0 0 24 24'>
                    <path
                      fill='#ffffff'
                      d='M4,4H7L9,2H15L17,4H20A2,2 0 0,1 22,6V18A2,2 0 0,1 20,20H4A2,2 0 0,1 2,18V6A2,2 0 0,1 4,4M12,7A5,5 0 0,0 7,12A5,5 0 0,0 12,17A5,5 0 0,0 17,12A5,5 0 0,0 12,7M12,9A3,3 0 0,1 15,12A3,3 0 0,1 12,15A3,3 0 0,1 9,12A3,3 0 0,1 12,9Z'
                    />
                  </CameraIcon>
                </CameraIconContainer>
              </Fragment>
            )}
            <ReaderContainer>
              <Reader
                delay={300}
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
          </Flex>
        </ModalCard>
        <Flex width={1} pt={16}>
          {/* Persist close button */}
          <Button
            to='/'
            style={{ width: '30%' }}
            onClick={() => completeScan(null)}
          >
            Cancel
          </Button>
        </Flex>
      </ModalBackdrop>
    </Portal>
  );
};

export default withBurner(Scanner);
