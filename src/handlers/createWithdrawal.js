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
  return async function (req, reply) {
    const senderWallet = await walletService.getDeployerWallet();
    const receiverWallet = await walletService.getWallet(req.body.receiverId);

    const tx = await contractInteraction.withdraPayment(senderWallet, req.body.amountInEthers, receiverWallet);

    console.log("withdraw", tx);

    reply.code(201).send({ result: tx });
  };
}

module.exports = { schema, handler };
