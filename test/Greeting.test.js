const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('Web3');
const web3 = new Web3(ganache.provider());
const compiledGreeting = require('../ethereum/build/Greeting.json');

let accounts;
let greeting;

beforeEach(async () => {
    accounts = await web3.eth.getAccounts();

    // Create greeting
    greeting = await new web3.eth.Contract(compiledGreeting.abi)
        .deploy({ data: compiledGreeting.evm.bytecode.object })
        .send({ from: accounts[0], gas: '3000000' });
});

describe('Greeting', () => {
    it('deploys a greeting contract', () => {
        assert.ok(greeting.options.address);
    });
    it('sets and gets the stored string', async () => {
        // Set the greeting string
        await greeting.methods.setGreeting("hello world")
            .send({ from: accounts[0], gas: '3000000' });
        // Get the greeting string
        const greetingStr = await greeting.methods.getGreeting().call();
        assert.strictEqual(greetingStr, "hello world");
    });
});