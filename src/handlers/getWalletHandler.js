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

function handler({ walletService }) {
  return async function (req, reply) {
    if (!req.user.isAdin && req.user.uid !== req.params.id) {
      return reply.code(403).send({ error: "You can only get your own wallet" });
    }
    const body = await walletService.getWalletData(req.params.id);
    reply.code(200).send(body);
  };
}

module.exports = { handler, schema };
