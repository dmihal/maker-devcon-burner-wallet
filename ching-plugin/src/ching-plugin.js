import axios from "axios";
import React from 'react';

function getTxDetails(qr) {
  const REGEX = /\/payment\/(0x[0-9a-f]{40})\/((\D\w*)\/)?([\d.]+)\/(\w*)/i
  const scan = REGEX.exec(qr)
  return scan && {
    to: scan[1],
    tokenName: scan[3] || 'xdai',
    amount: scan[4],
    orderId: scan[5]
  }
}

function getOrderId(txMessage) {
  const REGEX = /Ching order: (\w+)/
  const scan = REGEX.exec(txMessage)
  return scan && scan[1]
}

export default class Ching {
  initializePlugin(pluginContext) {
    // Add link to ching.store
    pluginContext.addElement('home-bottom', () =>
      <a
        href="https://app.ching.store"
        target="_blank"
        rel="noopener noreferrer"
        style={{ display: 'block', color: "#333333" }}
      >
        Make your own store with Ching!
      </a>
    )

    // Handle Ching QR codes
    pluginContext.onQRScanned((qr, pluginCtx) => {
      console.log("Scanned:", qr)

      const txDetails = getTxDetails(qr)
      if (!txDetails) {
        return
      }

      console.log(txDetails)

      pluginCtx.actions.send({
        to: txDetails.to,
        asset: txDetails.tokenName.toLowerCase(),
        ether: txDetails.amount,
        message: `Ching order: ${txDetails.orderId}`
      });

      return true;
    });

    // Send txHash to Ching after sending a transaction
    pluginContext.onSent(tx => {
      console.log("Sent:", { tx });

      const orderId = getOrderId(tx.message)
      if (!orderId) {
        return
      }

      let url =
        "https://us-central1-daipos.cloudfunctions.net/transactionBuffer?" +
        "orderId=" + orderId +
        "&txHash=" + tx.hash +
        "&networkId=100";

      console.log("Send tx details back:", url);

      axios.get(url).then(response => {
        console.log("Finished hitting the Ching servers:", response);
      });
    });
  }
}
