const ethers = require("ethers");

const getContract = (config, wallet) => {
  return new ethers.Contract(config.contractAddress, config.contractAbi, wallet);
};

const deposits = {};

const deposit =
  ({ config }) =>
  async (senderWallet, amountToSend, receiverWallet) => {
    const basicPayments = await getContract(config, senderWallet);
    const tx = await basicPayments.deposit(receiverWallet.address, {
      value: await ethers.utils.parseEther(amountToSend).toHexString(),
    });
    tx.wait(1).then(
      receipt => {
        const firstEvent = receipt && receipt.events && receipt.events[0];
        if (firstEvent && firstEvent.event == "DepositMade") {
          deposits[tx.hash] = {
            senderAddress: firstEvent.args.sender,
            amountSent: firstEvent.args.amount,
          };
        } else {
          console.error(`Payment not created in tx ${tx.hash}`);
        }
      },
      error => {
        const reasonsList = error.results && Object.values(error.results).map(o => o.reason);
        const message = error instanceof Object && "message" in error ? error.message : JSON.stringify(error);
        console.error("reasons List");
        console.error(reasonsList);

        console.error("message");
        console.error(message);
      },
    );
    return tx;
  };

const withdraPayment =
  ({ config }) =>
  async (senderWallet, amountToSend, receiverWallet) => {
    const basicPayments = await getContract(config, senderWallet);
    const tx = await basicPayments.sendPayment(receiverWallet.address, ethers.utils.parseEther(amountToSend));
    tx.wait(1).then(
      receipt => {
        const firstEvent = receipt && receipt.events && receipt.events[0];
        if (firstEvent && firstEvent.event == "PaymentMade") {
          deposits[tx.hash] = {
            senderAddress: firstEvent.args.sender,
            amountSent: firstEvent.args.amount,
          };
        } else {
          console.error(`Payment not created in tx ${tx.hash}`);
        }
      },
      error => {
        const reasonsList = error.results && Object.values(error.results).map(o => o.reason);
        const message = error instanceof Object && "message" in error ? error.message : JSON.stringify(error);
        console.error("reasons List");
        console.error(reasonsList);

        console.error("message");
        console.error(message);
      },
    );
    return tx;
  };

const getLocked =
  ({ config }) =>
  async (deploymentWallet, receiverWallet) => {
    const basicPayments = await getContract(config, deploymentWallet);
    const locked = await basicPayments.getDepositedPayments(receiverWallet.address);
    return ethers.utils.formatEther(locked);
  };

const getDepositReceipt =
  ({}) =>
  async depositTxHash => {
    return deposits[depositTxHash];
  };

module.exports = dependencies => ({
  deposit: deposit(dependencies),
  getDepositReceipt: getDepositReceipt(dependencies),
  getLocked: getLocked(dependencies),
  withdraPayment: withdraPayment(dependencies),
});
