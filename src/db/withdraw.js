const db = require("../../db/models");

const createWithdraw = async (hash, to, amount) => {
  const result = await db.withdraw.create({ hash, to, amount });

  return result.toJSON();
};

const updateWithdraw = async (hash, state) => {
  const result = await db.withdraw.findByPk(hash);

  if (result == null) {
    return null;
  }

  result.state = state;
  await result.save();
};

const getWithdraw = async hash => {
  const result = await db.withdraw.findByPk(hash);

  return result != null ? result.toJSON() : null;
};

module.exports = {
  createWithdraw,
  updateWithdraw,
  getWithdraw,
};
