async function main() {
    //initialize two eth accounts
    const [owner, other] = await hre.ethers.getSigners();
    //launching contract and assigning to var
    const keyboardsContractFactory = await hre.ethers.getContractFactory("Keyboards");
    const keyboardsContract = await keyboardsContractFactory.deploy();
    await keyboardsContract.deployed();
    //print out contract
    console.log("Contract deployed to:", keyboardsContract.address);
    
    const keyboardTxn1 = await keyboardsContract.create(0, true, "black");
    const keyboardTxnReceipt = await keyboardTxn1.wait();
    console.log(keyboardTxnReceipt.events);

    const keyboardTxn2 = await keyboardsContract.connect(other).create(1, false, "rgb");
    const keyboardTxn2Receipt = await keyboardTxn2.wait();
    console.log(keyboardTxn2Receipt.events);

    const balanceBefore = await hre.ethers.provider.getBalance(other.address);
    console.log("Other balance before:", hre.ethers.utils.formatEther(balanceBefore));

    const tipTxn = await keyboardsContract.connect(other).tip(0, {value: hre.ethers.utils.parseEther("1")});
    const tipTxnReceipt = await tipTxn.wait();
    console.log(tipTxnReceipt.events);

    const balanceAfter = await hre.ethers.provider.getBalance(other.address);
    console.log("Other balance after:", hre.ethers.utils.formatEther(balanceAfter));

    keyboards = await keyboardsContract.getKeyboards();
    console.log("We got the keyboards!", keyboards);

    keyboards = await keyboardsContract.connect(other).getKeyboards();
    console.log("We got the keyboards as someone else!", keyboards);
  }
  
  // We recommend this pattern to be able to use async/await everywhere
  // and properly handle errors.
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
  