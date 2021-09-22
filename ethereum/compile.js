// Compiles the Election contract and outputs it to a json abi
const path = require('path');
const solc = require('solc');
const fs = require('fs-extra');

const buildPath = path.resolve(__dirname, 'build');
// Whenever we compile/recompile remove the abis
fs.removeSync(buildPath);

// Compile the solidity contract file and output the abi
const electionPath = path.resolve(__dirname, 'contracts', 'Greeting.sol');
const source = fs.readFileSync(electionPath, 'utf8');
const input = {
    language: "Solidity",
    sources: {
        "Greeting.sol": {
            content: source,
        },
    },
    settings: {
        outputSelection: {
            "*": {
                "*": ["*"],
            },
        },
    },
};
const output = JSON.parse(solc.compile(JSON.stringify(input))).contracts['Greeting.sol'];

// Create build folder if it does not already exist
fs.ensureDirSync(buildPath);

for (let contract in output) {
    fs.outputJSONSync(
        path.resolve(buildPath, `${contract}.json`),
        output[contract]
    );
}
