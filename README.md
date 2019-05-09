# 6000D-Horse-Racing

# Group project for MSBD 6000D

Gallop Chain

# Project Folder Structure

- **BackEnd**: It's for Web Service that will connect to the Database and serve the Front-end app.
- **Ethereum**: All smart contract code and deployment script are included here.
- **FrontEnd**: Front-end mobile app folder. Written by React-Native.
- **python**: Data extraction/loading script to get data from other sources like HKJC.

## Getting Started

### How to run the FrontEnd App

The program will need node.js and npm which is the node package manager installed on your local PC. It's cross-platform so will be applicable for all systems (windows, macOs etc). The app is wrapped by Expo which can found more details here https://expo.io. You are able to run the app in all simulators of Android, iOS and real phones.

```
cd ./FrontEnd/HorseRacing
npm install
npm start
```

Key components for the FrontEnd App:

- Wrapper: Expo.io https://expo.io.
- UI Component: react-native-elements https://react-native-training.github.io/react-native-elements/
- Navigation: React-navigation https://reactnavigation.org 

### How to run the Ethereum scripts

The smart contract is written by **Solidity** and we used Ethereum for our blockchain development. Key components are:

1. **Geth** as our ethereum client node. Details are here https://github.com/ethereum/go-ethereum/wiki/geth.
2. **solc-js** as our Solidity complier. Details are here https://github.com/ethereum/solc-js.
3. **Ropsten** as our testnet of Blockchain.

Firstly, we need to install all above components:

#### Install Solidity Compiler in macOs:

Details are https://solidity.readthedocs.io/en/v0.5.3/installing-solidity.html. Use **brew** to install, 
```
	Brew tap ethereum/ethereum
	Brew install solidity
```

#### Compile Smart Contract

Use **solc-js** to compile Solidity code. It will generate json file which contains ABI, Bin and MetaData.

```
cd ./Ethereum
solc --combined-json=abi,bin,metadata --output-dir . player.sol
```

#### Install Geth

Full details are here https://github.com/ethereum/go-ethereum/wiki/Installation-Instructions-for-Mac.

Clone the repository to a directory of your choosing:

```
git clone https://github.com/ethereum/go-ethereum
```

Building geth requires the Go compiler:

```
brew install go
```

Finally, build the geth program using the following command.

```
cd go-ethereum
make geth
```

If you see some errors related to header files of Mac OS system library, install XCode Command Line Tools, and try again.

```
xcode-select --install
```

#### Connect Geth to Ropsten testnet.

```
Geth --testnet --rpc -rpcapi=”eth,net,web3,personal,txpool” --syncmode=light
```

#### Attach Geth client to localhost

```
geth attach http://127.0.0.1:8545
```

After we run above command, we are able to connect to Geth client via JS code by using the url http://127.0.0.1:8545 in our script. 

#### Create and Deploy Smart Contract

```
cd ./Ethereum
npm install 
node deploy.js
```

# How does this work ?

## Screenshots from the game

![alt text](https://i.ibb.co/BtvtB4n/Start-Game.png)


## High-level System Architecture

![alt text](https://i.ibb.co/BtvtB4n/Start-Game.png)

## Database Schema

![alt text](https://i.ibb.co/gdZtFMP/db-schema-002.png)

In the above schema the table with user-details (users_only_for_Account_Creation) is created temporary and after creation of the corresponding wallet, it will be deleted.

## Future Work


## Authors

_Abhishek P_, <br/>
_Michael Chen_, & <br/>
_Bikram Gangwar_<br/>
