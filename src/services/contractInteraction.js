const ethers = require("ethers");
const { createDeposit, updateDeposit, getDeposit } = require("../db/deposit");
const { createWithdraw, updateWithdraw, getWithdraw } = require("../db/withdraw");

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
          updateDeposit(tx.hash, "minted");
        } else {
          console.error(`Payment not created in tx ${tx.hash}`);
          updateDeposit(tx.hash, "failed");
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
    const deposit = await createDeposit(tx.hash, receiverWallet.address, senderWallet.address, amountToSend);
    return deposit;
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
          updateWithdraw(tx.hash, "minted");
        } else {
          console.error(`Payment not created in tx ${tx.hash}`);
          updateWithdraw(tx.hash, "failed");
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
    const withdraw = await createWithdraw(tx.hash, receiverWallet.address, amountToSend);
    return withdraw;
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
    return getDeposit(depositTxHash);
  };

const getWithdrawReceipt =
  ({}) =>
  async withdrawTxHash => {
    return getWithdraw(withdrawTxHash);
  };

module.exports = dependencies => ({
  deposit: deposit(dependencies),
  getDepositReceipt: getDepositReceipt(dependencies),
  getLocked: getLocked(dependencies),
  withdraPayment: withdraPayment(dependencies),
  getWithdrawReceipt: getWithdrawReceipt(dependencies),
});
