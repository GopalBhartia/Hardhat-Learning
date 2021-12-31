const { showThrottleMessage } = require('@ethersproject/providers');
const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('Token contract', () => {
    let Token, token, owner, addr1, addr2;

    beforeEach(async () => {
        Token = await ethers.getContractFactory('Token');
        token = await Token.deploy();
        [owner, addr1, addr2, _] = await ethers.getSigners();
    });

    describe('Deployment', () => {
        it('should set the right owner', async () => {
            expect(await token.owner()).to.equal(owner.address);
        });
        it('should assign the total supply of tokens to the owner', async () => {
            const ownerBalance = await token.balanceOf(owner.address);
            expect(await token.totalSupply()).to.equal(ownerBalance);
        });
    });

    describe('Transactions', () => {
        it('should transfer tokens between accounts', async () => {
            await token.transfer(addr1.address, 50);
            const addr1Balace = await token.balanceOf(addr1.address);
            expect(addr1Balace).to.equal(50);

            await token.connect(addr1).transfer(addr2.address, 50);
            const addr2Balance = await token.balanceOf(addr2.address);
            expect(addr2Balance).to.equal(50);
        });

        it('should fail if sender doesnt have enough tokens', async () => {
            const initialBalanceOwner = await token.balanceOf(owner.address);

            await expect(token.connect(addr1).transfer(owner.address, 10)).to.be.revertedWith('Not enough balance');
            expect(await token.balanceOf(owner.address)).to.equal(initialBalanceOwner);
        });

        it('should update balances after transfers complete', async () => {
            const initialBalanceOwner = await token.balanceOf(owner.address);

            await token.transfer(addr1.address, 200);
            await token.transfer(addr2.address, 100);

            const finalBalanceOwner = await token.balanceOf(owner.address);
            expect(finalBalanceOwner).to.equal(initialBalanceOwner - 300);

            const addr1Balance = await token.balanceOf(addr1.address);
            expect(addr1Balance).to.equal(200);

            const addr2Balance = await token.balanceOf(addr2.address);
            expect(addr2Balance).to.equal(100);

        });
    });
});