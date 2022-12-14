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
    const body = await walletService.createWallet(req.user.uid);
    return reply.code(200).send({ result: body });
  };
}

module.exports = { handler, schema };
