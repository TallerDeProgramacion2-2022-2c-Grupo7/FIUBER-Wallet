const db = require("../../db/models");

const createWallet = async (uid, publicKey, privateKey) => {
  const result = await db.wallet.create({ uid, publicKey, privateKey });

  return result.toJSON();
};

const getWallets = async () => {
  const wallets = await db.wallet.findAll();

  return wallets.map(wallet => wallet.toJSON());
};

const getWalletByUid = async uid => {
  const wallet = await db.wallet.findByPk(uid);

  return wallet.toJSON();
};

module.exports = {
  createWallet,
  getWallets,
  getWalletByUid,
};
