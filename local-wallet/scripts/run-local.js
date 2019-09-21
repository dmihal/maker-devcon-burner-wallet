const { spawn } = require('child_process');
const fs = require('fs');
const Web3 = require('web3');
const { testRPC } = require('./run-local-lib');
const utils = require('ethereumjs-util');

const RPC = 'http://localhost:8545';
const PK_USER = '0xecb2222da7cbca080201acf6a7bbda53a3b2bcb22e3004b83ab8c69a884becb9';

const DEPLOYER_PK = '0x13179885a8731284475aa2317a35a292131772bb5aa33734a1290b8b13944409';
const DEPLOYER_ADDRESS = utils.bufferToHex(utils.privateToAddress(DEPLOYER_PK));

const COLLECTABLE_ADDRESS = utils.bufferToHex(utils.generateAddress(DEPLOYER_ADDRESS, '0'));

(async function() {
  if (!await testRPC(RPC)) {
    throw new Error('Ganache not found on port 8545');
  }

  const web3 = new Web3(new Web3.providers.HttpProvider(RPC), null, {
    transactionConfirmationBlocks: 1,
  });

  const [defaultAccount] = await web3.eth.getAccounts();
  if (!defaultAccount) {
    throw new Error('Can not find an unlocked account');
  }

  const user = web3.eth.accounts.privateKeyToAccount(PK_USER);
  const deployer = web3.eth.accounts.privateKeyToAccount(DEPLOYER_PK);

  const balance = await web3.eth.getBalance(user.address);
  console.log(balance, 'bal');
  if (balance === '0') {
    console.log(`Sending 1 ETH from ${defaultAccount} to ${user.address}`);
    await web3.eth.sendTransaction({
      from: defaultAccount,
      to: user.address,
      value: web3.utils.toWei('1', 'ether'),
    });
  }

  const collectableCode = await web3.eth.getCode(COLLECTABLE_ADDRESS);
  if (collectableCode === '0x') {
    console.log('Collectable contract not found, deploying');
    await web3.eth.sendTransaction({
      from: defaultAccount,
      to: deployer.address,
      value: web3.utils.toWei('.1', 'ether'),
    });

    const collectableBytecode = fs.readFileSync(`${__dirname}/collectable-bytecode.txt`, 'utf8');
    const { rawTransaction } = await deployer.signTransaction({
      gas: '5000000',
      data: collectableBytecode,
    })
    await web3.eth.sendSignedTransaction(rawTransaction);
  }


  spawn('yarn', ['start-wallet'], {
    env: {
      ...process.env,
      REACT_APP_PK: PK_USER,
      REACT_APP_NFT_ADDRESS: COLLECTABLE_ADDRESS,
    },
    stdio: 'inherit',
  });
})();

