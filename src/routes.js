const getWalletData = require("./handlers/getWalletHandler");
const getWalletsData = require("./handlers/getWalletsHandler");
const createWallet = require("./handlers/createWalletHandler");
const createDeposit = require("./handlers/createDepositHandler");
const getDeposit = require("./handlers/getDepositHandler");

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

module.exports = [getWalletDataRoute, getWalletsDataRoute, createWalletRoute, createDepositRoute, getDepositRoute];
