import React from 'react';
import styled from 'styled-components';
import QRCode from 'qrcode.react';
import { BurnerContext, withBurner } from '../../BurnerProvider';
import { TransactionCardBody } from '../../components/TransactionCard';
import Text from '../../components/Text';
import { Flex, Box } from 'rimble-ui';
import { Redirect } from 'react-router-dom';

const QRWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 16px;
  margin: 16px;
  border: 1px solid #999;
  border-radius: 8px;
`;

const QR = styled(QRCode)`
  width: 70vw;
  height: 70vw;
`;

// const CopyButton = ({ clipboardText, ...props }) => {
//   const text = {
//     tooltip: 'Copy to clipboard',
//     button: 'Copy'
//   };

//   if (!props.textLabels) {
//     return (
//       <Clipboard text={clipboardText}>
//         {isCopied => (
//           <Tooltip message={text.tooltip}>
//             <Button size={'small'} p={0}>
//               <Icon name={isCopied ? 'Check' : 'Assignment'} />
//             </Button>
//           </Tooltip>
//         )}
//       </Clipboard>
//     );
//   }
//   return (
//     <Clipboard text={clipboardText}>
//       {isCopied => (
//         <Button size={'small'}>{!isCopied ? text.button : 'Copied!'}</Button>
//       )}
//     </Clipboard>
//   );
// };
const domain =
  location.protocol +
  '//' +
  location.hostname +
  (location.port ? ':' + location.port : '');
const AddressOnly = ({ defaultAccount }) => {
  const sendUrl = `${domain}/send/${defaultAccount}`;
  const infoText = 'Show this QR code to somebody else with a Burner Wallet';
  return (
    <Flex flexDirection='column' p={3}>
      <TransactionCardBody>
        <Text level={3} as='h2'>
          {infoText}
        </Text>
        <QR value={sendUrl} renderAs='svg' />
      </TransactionCardBody>
    </Flex>
  );
};

export default withBurner(AddressOnly);
