function schema() {
  return {
    params: {
      type: "object",
      properties: {
        amountInEthers: {
          type: "string",
        },
        receiverId: {
          type: "string",
        },
      },
    },
    required: ["senderId", "amountInEthers", "receiverId"],
  };
}

function handler({ contractInteraction, walletService }) {
  return async function (req) {
    const senderWallet = await walletService.getDeployerWallet();
    const receiverWallet = await walletService.getWallet(req.body.receiverId);

    return contractInteraction.withdraPayment(senderWallet, req.body.amountInEthers, receiverWallet);
  };
}

module.exports = { schema, handler };
