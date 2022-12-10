const ethers = require("ethers");
const db = require("../db/wallet");
const accounts = [];

const getDeployerWallet =
  ({ config }) =>
  () => {
    const provider = new ethers.providers.AlchemyProvider(config.network, process.env.ALCHEMY_API_KEY);
    const wallet = ethers.Wallet.fromMnemonic(config.deployerMnemonic).connect(provider);
    console.log("Deployer wallet" + wallet.address);
    return wallet;
  };

const createWallet =
  ({ config }) =>
  async uid => {
    const provider = new ethers.providers.AlchemyProvider(config.network, process.env.ALCHEMY_API_KEY);
    // This may break in some environments, keep an eye on it
    const wallet = ethers.Wallet.createRandom().connect(provider);
    const result = await db.createWallet(uid, wallet.address, wallet.privateKey);
    return result;
  };

const getWalletsData = () => uid => {
  return uid ? [db.getWalletByUid(uid)] : db.getWallets();
};

const getWalletData = () => uid => {
  return db.getWalletByUid(uid);
};

const getWallet =
  ({ config }) =>
  async uid => {
    const provider = new ethers.providers.AlchemyProvider(config.network, process.env.ALCHEMY_API_KEY);
    const walletData = await db.getWalletByUid(uid);

    if (walletData == null) {
      return null;
    }

    return new ethers.Wallet(walletData.privateKey, provider);
  };

const getBalance =
  ({ config }) =>
  async uid => {
    const wallet = await getWallet({ config })(uid);
    const balance = await wallet.getBalance();

    return ethers.utils.formatEther(balance);
  };

module.exports = ({ config }) => ({
  createWallet: createWallet({ config }),
  getDeployerWallet: getDeployerWallet({ config }),
  getWalletsData: getWalletsData({ config }),
  getWalletData: getWalletData({ config }),
  getWallet: getWallet({ config }),
  getBalance: getBalance({ config }),
});
