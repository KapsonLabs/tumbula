# Tumbula Store
Tumbula Store is an online marketplace that operates on the blockchain. There are a list of stores on a central marketplace where shoppers can purchase goods posted by the store owners.

## High Level Architecture Diagram
![Image of HighlevelArchitecture](/images/TumbulaStore.jpg)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. Run to compile the contract. Ensure you have a local copy of a development blockchain e.g ganache running in the background for local testing.

```
truffle compile
```

Then

```
truffle migrate --network development
```

### Prerequisites

You need to have ganache cli or  ganache app which comes in the truffle suite, and npm installed,

You can run ganache-cli in the terminal or open the ganache app

```
ganache-cli
```

Copy the generated Mnemonic 

Paste the mnemonic in Metamask to import the local accounts running on Ganache. Ensure metamask is listening on localhost.

### Installing

You can install project dependencies from the root directory

```
npm install
```

To run the application frontend,

```
cd client
npm install
npm run start
```

## Running the tests

You run tests on the root directory using truffle

### Break down into end to end tests

These tests the smart contracts methods

```
truffle test
```

## Deployment

The smart contract is deployed to the rinkeby testnet. 
The frontend application is hosted on a personal VPS.
* [Etherscan](https://rinkeby.etherscan.io/address/0x114Ebc329d6cDD434091238C558DA19208a28B21) - Checkout the trasactions on etherscan by appending your address from Metamask to the link provided
* [React FrontEnd](http://tumbula.kapsonlabs.ml) - Live front app


## Built With

* [Truffle](https://www.trufflesuite.com/) - Javascript suite for efficient smart contract development.
* [Mythx](https://mythx.io/) - Security analysis tool for smart contract development
* [Metamask](https://metamask.io/) - For the browser interaction, this is a chrome extension.
* [React](https://reactjs.org/) - The Frontend framework used
* [Django](https://www.djangoproject.com/) - Backend framework used to build the API.


## Authors

* **Allan Katongole** - *Initial work* - [TumbulaStores](https://github.com/KapsonLabs/tumbula)


## License

This project is licensed under the GNU Public License - see the [LICENSE](LICENSE) file for details

## Acknowledgments

* [Consensys Academy](https://consensys.net/academy/) - For providing well curated content that helped me gain greater blockchain understanding.
* [African Blockchain Allaince](https://afriblockchain.org/) - For providing community support and sponsorship for the course.
* [Cryptosavannah](https://cryptosavannah.com/) - For the logistics and support.
* My mentor @joshorig - For the endless support and guidance during the development of this project.
