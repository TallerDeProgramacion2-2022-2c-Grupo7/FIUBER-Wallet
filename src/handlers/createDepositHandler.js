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
  return async function (req, reply) {
    const senderWallet = await walletService.getWallet(req.body.senderId);
    const receiverWallet = await walletService.getWallet(req.body.receiverId);

    const tx = await contractInteraction.deposit(senderWallet, req.body.amountInEthers, receiverWallet);

    console.log("deposit", tx);

    reply.code(201).send({ result: tx });
  };
}

module.exports = { schema, handler };
