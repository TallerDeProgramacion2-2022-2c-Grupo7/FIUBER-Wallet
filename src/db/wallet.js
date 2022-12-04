const db = require("../../db/models");

const createWallet = async (uid, publicKey, privateKey) => {
  const result = await db.wallet.create({ uid, publicKey, privateKey });

  return result.toJSON();
};

const getWallets = async () => {
  const wallets = await db.wallet.findAll();

  return wallets.toJSON();
};

const getWalletByUid = async uid => {
  const wallet = await db.wallet.findOne({ where: { uid } });
};

module.exports = {
  createWallet,
  getWallets,
  getWalletByUid,
};
