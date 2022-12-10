function schema() {
  return {
    params: {
      type: "object",
      properties: {
        senderId: {
          type: "string",
        },
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
    const senderWallet = await walletService.getWallet(req.body.senderId);
    const receiverWallet = await walletService.getWallet(req.body.receiverId);

    return contractInteraction.deposit(senderWallet, req.body.amountInEthers, receiverWallet);
  };
}

module.exports = { schema, handler };
