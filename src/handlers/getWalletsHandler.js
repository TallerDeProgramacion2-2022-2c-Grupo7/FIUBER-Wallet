function schema() {
  return {
    params: {},
  };
}

function handler({ walletService }) {
  return async function (req, reply) {
    const uid = req.user.isAdmin ? undefined : req.user.uid;
    const body = await walletService.getWalletsData(uid);
    return reply.code(200).send({ result: body });
  };
}

module.exports = { handler, schema };
