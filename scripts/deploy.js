// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
  const name = "nft1";
  const symbol = "NFT1"

  const Erc721 = await hre.ethers.getContractFactory("StandardERC721");
  const erc721 = await Erc721.deploy(name,symbol);

  await erc721.deployed();

  console.log(
    `Erc721 with name = ${name},symbol = ${symbol} deployed to ${erc721.address}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
