function schema() {
  return {
    params: {
      type: "object",
      properties: {
        id: {
          type: "string",
        },
      },
    },
    required: ["id"],
  };
}

function handler({ contractInteraction, walletService }) {
  return async function (req, reply) {
    if (!req.user.isAdmin && req.user.uid !== req.params.id) {
      return reply.code(403).send({ error: "You can only get your own balance" });
    }
    const balance = await walletService.getBalance(req.params.id);

    reply.code(200).send({ result: balance });
  };
}

module.exports = { schema, handler };
