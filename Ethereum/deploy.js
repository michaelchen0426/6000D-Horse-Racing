let fs = require('fs');
let solc = require('solc');
let Web3 = require('web3');

function compileContract() {
    let compilerInput = {
        'HorseRacing': fs.readFileSync('player.sol', 'utf8')
    };

    console.log('Compiling the contract');

    //Compile and optimize the contract
    var input = {
        language: 'Solidity',
        sources: {
            'player.sol': {
                content: fs.readFileSync('player.sol', 'utf8')
            }
        },
        settings: {
            outputSelection: {
                '*': {
                    '*': [ '*' ]
                }
            }
        }
    }
    
    var compiledContract = JSON.parse(solc.compile(JSON.stringify(input)))

    let contract = compiledContract.contracts['player.sol']['HorseRacing'];
    console.log("Complete compiling the contract")
    // Save contract's ABI
    let abi = JSON.stringify(contract.abi);
    fs.writeFileSync('playerABI.json', abi)

    return contract;
}

function createWeb3() {
    console.log("Creating web3....")
    const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));

    console.log("Complete creating web3....")
    return web3;
}

async function deployContract(web3, contract, player) {
    console.log('Deploying the contract');

    let HorseRacing = new web3.eth.Contract(contract.abi);
    let bytecode = '0x' + contract.evm.bytecode.object;

    let gasEstimate = await web3.eth.estimateGas({data: bytecode});

    const contractInstance = await HorseRacing.deploy({
        data: bytecode
    })
    .send({
        from: player,
        gas: gasEstimate
    })
    .on('transactionHash', function(transactionHash) {
        console.log(`Transaction hash: ${transactionHash}`);
    })
    .on('confirmation', function(confirmationNumber, receipt) {
        console.log(`Confirmation number: ${confirmationNumber}`);
        console.log(receipt)
    })

    console.log(`Contract address: ${contractInstance.options.address}`)

    //Use the contract address and ABI, we can interact with the contract later.
    //Need to unlock the account before deploy
    //in geth, after geth attach, run personal.unlockAccount('xxxxx', 'key', seconds)
}


let contract = compileContract();
let web3 = createWeb3();
let player = '0xef13836de537659c78b787405327434c3d1bb6dc';

deployContract(web3, contract, player)
    .then(function () {
        console.log('Deployment finished');
    })
    .catch(function (error) {
        console.log(`Failed to deploy contract: ${error}`)
    });
