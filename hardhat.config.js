/**
 * @type import('hardhat/config').HardhatUserConfig
 */
require('@nomiclabs/hardhat-waffle');

const INFURA_URL = 'https://rinkeby.infura.io/v3/fcfb8183229d454a9fe37df37ab35a4e';
const PRIVATE_KEY = '8776158933bc30c12d9b121ab2c25b88b7ec9b3056ebd3356368ecb1a8214e06';

module.exports = {
  solidity: "0.8.0",
  networks: {
    rinkeby: {
      url: INFURA_URL,
      accounts: [`0x${PRIVATE_KEY}`]
    }
  }
};

