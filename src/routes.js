const getWalletData = require("./handlers/getWalletHandler");
const getWalletsData = require("./handlers/getWalletsHandler");
const createWallet = require("./handlers/createWalletHandler");
const createDeposit = require("./handlers/createDepositHandler");
const getDeposit = require("./handlers/getDepositHandler");
const getBalance = require("./handlers/getBalanceHandler");
const getLocked = require("./handlers/getLockedHandler");
const createWithdrawal = require("./handlers/createWithdrawal");
const getWithdrawal = require("./handlers/getWithdrawal");

function getWalletDataRoute({ services, config, fastify }) {
  return {
    method: "GET",
    url: "/wallet/:id",
    schema: getWalletData.schema(config),
    handler: getWalletData.handler({ config, ...services }),
    preHandler: fastify.auth([fastify.firebaseAuth]),
  };
}

function getWalletsDataRoute({ services, config, fastify }) {
  return {
    method: "GET",
    url: "/wallet",
    schema: getWalletsData.schema(config),
    handler: getWalletsData.handler({ config, ...services }),
    preHandler: fastify.auth([fastify.firebaseAuth]),
  };
}

function createWalletRoute({ services, config, fastify }) {
  return {
    method: "POST",
    url: "/wallet",
    schema: createWallet.schema(config),
    handler: createWallet.handler({ config, ...services }),
    preHandler: fastify.auth([fastify.firebaseAuth]),
  };
}

function createDepositRoute({ services, config, fastify }) {
  return {
    method: "POST",
    url: "/deposit",
    schema: createDeposit.schema(config),
    handler: createDeposit.handler({ config, ...services }),
    preHandler: fastify.auth([fastify.firebaseAuth]),
  };
}

function getDepositRoute({ services, config, fastify }) {
  return {
    method: "GET",
    url: "/deposit/:txHash",
    schema: getDeposit.schema(config),
    handler: getDeposit.handler({ config, ...services }),
    preHandler: fastify.auth([fastify.firebaseAuth]),
  };
}

function getBalanceRoute({ services, config, fastify }) {
  return {
    method: "GET",
    url: "/balance/:id",
    schema: getBalance.schema(config),
    handler: getBalance.handler({ config, ...services }),
    preHandler: fastify.auth([fastify.firebaseAuth]),
  };
}

function getLockedRoute({ services, config, fastify }) {
  return {
    method: "GET",
    url: "/locked/:id",
    schema: getLocked.schema(config),
    handler: getLocked.handler({ config, ...services }),
    preHandler: fastify.auth([fastify.firebaseAuth]),
  };
}

function createWithdawalRoute({ services, config, fastify }) {
  return {
    method: "POST",
    url: "/withdraw",
    schema: createWithdrawal.schema(config),
    handler: createWithdrawal.handler({ config, ...services }),
    preHandler: fastify.auth([fastify.firebaseAuth]),
  };
}

function getWithdrawalRoute({ services, config, fastify }) {
  return {
    method: "GET",
    url: "/withdraw/:txHash",
    schema: getWithdrawal.schema(config),
    handler: getWithdrawal.handler({ config, ...services }),
    preHandler: fastify.auth([fastify.firebaseAuth]),
  };
}

module.exports = [
  getWalletDataRoute,
  getWalletsDataRoute,
  createWalletRoute,
  createDepositRoute,
  getDepositRoute,
  getBalanceRoute,
  getLockedRoute,
  createWithdawalRoute,
  getWithdrawalRoute,
];
