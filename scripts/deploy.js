const { ethers } = require('hardhat');
const fs = require('fs');


async function main() {
    const [deployer] = await ethers.getSigners();
    console.log(`Deploying contract from address: ${deployer.address}`);
    const balance = await deployer.getBalance();
    console.log(`Account balance: ${balance}`);
    const Token = await ethers.getContractFactory('Token');
    const token = await Token.deploy();
    console.log(`Contract address: ${token.address}`);
    const balance2 = await deployer.getBalance();
    console.log(`Account balance after deployement: ${balance2}`);
    const data = {
        address: token.address,
        abi: JSON.parse(token.interface.format('json'))
    };
    fs.writeFileSync('frontend/src/Token.json', JSON.stringify(data));
}

main().
    then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });