function schema() {
  return {
    params: {
      type: "object",
      properties: {
        receiverId: {
          type: "string",
        },
      },
    },
    required: ["receiverId"],
  };
}

function handler({ contractInteraction, walletService }) {
  return async function (req, reply) {
    if (!req.user.isAdmin && req.user.uid !== req.params.id) {
      return reply.code(403).send({ error: "You can only get your own locked" });
    }

    const receiverWallet = await walletService.getWallet(req.params.id);

    const locked = await contractInteraction.getLocked(walletService.getDeployerWallet(), receiverWallet);
    reply.code(200).send({ result: locked });
  };
}

module.exports = { schema, handler };
