function schema() {
  return {
    params: {
      type: "object",
      properties: {
        txHash: {
          type: "string",
        },
      },
    },
    required: ["txHash"],
  };
}

function handler({ contractInteraction }) {
  return async function (req, reply) {
    const body = await contractInteraction.getDepositReceipt(req.params.txHash);
    reply.code(200).send({ result: body });
  };
}

module.exports = { handler, schema };
