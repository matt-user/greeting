// Deploy our smart contracts to an ethereum network
// Currently deploying to ropsten
const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const compiledGreeting = require('./build/Greeting.json');
require('dotenv').config();

const provider = new HDWalletProvider(
    process.env.SECRET,
    process.env.INFURA_API
);

const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();
    console.log(`Attempting to deploy from account ${accounts[0]}`);
    const result = await new web3.eth.Contract(compiledGreeting.abi)
        .deploy({ data: compiledGreeting.evm.bytecode.object })
        .send({ gas: '3000000', from: accounts[0], gasPrice: '5000000000' });
    console.log(`Contract deployed to ${result.options.address}`);
    provider.engine.stop();
};
deploy();