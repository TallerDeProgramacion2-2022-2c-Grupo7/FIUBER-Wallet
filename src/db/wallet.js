const db = require("../../db");

const createWallet = async (uid, publicKey, privateKey) => {
  await db.wallet.create({ uid, publicKey, privateKey });

  console.log("Wallet created", uid);
};

module.exports = {
  createWallet,
};
