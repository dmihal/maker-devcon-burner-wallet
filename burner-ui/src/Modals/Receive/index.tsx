import React, { Component } from 'react';
import styled from 'styled-components';
import {
  Box,
  Flex,
  Card,
  Tooltip,
  Button,
  Icon,
  Input,
  QR,
  Portal
} from 'rimble-ui';
import Text from '../../components/Text';
import Clipboard from '../../components/Clipboard';

const ModalBackdrop = styled(Box)`
  & {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 9999;
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-flow: column;
    place-items: center;
    place-content: center;
  }
`;

ModalBackdrop.defaultProps = {
  bg: 'blacks.10',
  p: 3
};

const StyledInput = styled(Input)`
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Header = styled(Box)`
background: var(--color-makergradient);
`

interface AddressQrModalProps {
  isOpen: boolean;
  hide: Function;
  address: string;
}

class ReceiveModal extends Component<AddressQrModalProps> {
  constructor(props: AddressQrModalProps) {
    super(props);
  }

  closeModal = () => {
    this.props.hide();
  };

  render() {
    const { isOpen, address } = this.props;

    const text = {
      title: 'Your Address',
      description:
        'Scan this code with your wallet to send money to it.'
    };

    const colors = {
      foreground: 'black',
      background: 'white'
    };

    return (
      isOpen && (
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
              justifyContent={'space-between'}
              flex={'1'}
            >
              <Button.Text
                icon={'Close'}
                mainColor={'inherit'}
                p={0}
                borderRadius={'100%'}
                position={'absolute'}
                top={0}
                right={0}
                onClick={this.closeModal}
              />


              <Header p={[3, 4]} pt={0} overflow={'scroll'}>
              <Text
                level={1}
                as={'h1'}
                color={'var(--color-primary)'}
                left
              >
                {text.title}
              </Text>
                <Text level={3} as={'p'} margin={0} left>
                  {text.description}
                </Text>
              </Header>
                <Box
                  // size={['100%', '200px']}
                  width={1}
                  maxWidth={'220px'}
                  mx={'auto'}
                  mt={3}
                  mb={4}
                  p={4}
                  bg={'white'}
                  border={1}
                  borderColor={'blacks.3'}
                  borderRadius={2}
                  boxShadow={2}
                >
                  <QR value={address} size={'100%'} />
                </Box>
                <Box p={[3, 4]} pt={0} overflow={'scroll'}>
                  <Clipboard text={address}>
                    {isCopied => (
                      <Box
                        color={'inherit'}
                        position={'relative'}
                        display={'flex'}
                        alignItems={'center'}
                      >
                        <StyledInput
                          readOnly
                          value={address}
                          width={1}
                          pr={'5rem'}
                          fontWeight={3}
                        />
                        <Button
                          size={'small'}
                          width={'4rem'}
                          mx={2}
                          position={'absolute'}
                          right={0}
                        >
                          {!isCopied ? 'Copy' : <Icon name={'Check'} />}
                        </Button>
                      </Box>
                    )}
                  </Clipboard>
                </Box>
            </Card>
            {/*
            <Card borderRadius={2} border={0} padding={2} marginTop='var(--page-margin)' backgroundColor={'var(--color-tertiary)'}>
              <Flex flexDirection={'row'} alignItems={'center'}>
              <Box borderRadius={'100px'} backgroundColor={'var(--color-primary)'}>
                <Icon name="Add" borderRadius={100} color={'var(--color-tertiary)'} />
              </Box>
              <Box width={'100%'}>
                <Text level={3} as={'h3'} center color={'var(--color-primary)'}>
                  Create Custom Request
                </Text>
              </Box>
              </Flex>
            </Card>
            */}
          </ModalBackdrop>
        </Portal>
      )
    );
  }
}

const CopyButton = ({ clipboardText, ...props }) => {
  const text = {
    tooltip: 'Copy to clipboard',
    button: 'Copy'
  };

  if (!props.textLabels) {
    return (
      <Clipboard text={clipboardText}>
        {isCopied => (
          <Tooltip message={text.tooltip}>
            <Button size={'small'} p={0}>
              <Icon name={isCopied ? 'Check' : 'Assignment'} />
            </Button>
          </Tooltip>
        )}
      </Clipboard>
    );
  }
  return (
    <Clipboard text={clipboardText}>
      {isCopied => (
        <Button size={'small'}>{!isCopied ? text.button : 'Copied!'}</Button>
      )}
    </Clipboard>
  );
};

// class EthAddress extends Component {
//   render() {
//     return (
//       <StyledWrapper {...this.props}>
//         <StyledInput
//           readOnly
//           value={this.props.address}
//           ref={this.inputRef}
//           width={1}
//           fontWeight={3}
//           pr={this.props.textLabels ? '12rem' : '6rem'}
//         />

//         <Flex position={'absolute'} right={0} mr={2}>
//           <CopyButton
//             clipboardText={this.props.address}
//             textLabels={this.props.textLabels}
//           />
//           <QRButton
//             address={this.props.address}
//             textLabels={this.props.textLabels}
//           />
//         </Flex>
//       </StyledWrapper>
//     );
//   }
// }

// EthAddress.propTypes = {
//   /**
//    * Sets Ethereum address as the value of the field
//    */
//   address: PropTypes.string.isRequired,

//   /**
//    * Changes buttons to text from icons
//    */
//   textLabels: PropTypes.bool
// };

// EthAddress.defaultProps = {
//   textLabels: false
// };

// EthAddress.displayName = 'EthAddress';

// export { QRButton };
export default ReceiveModal;
