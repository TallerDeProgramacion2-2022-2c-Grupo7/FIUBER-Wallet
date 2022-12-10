const db = require("../../db/models");

const createDeposit = async (hash, to, from, amount) => {
  const result = await db.deposit.create({ hash, to, from, amount });

  return result.toJSON();
};

const updateDeposit = async (hash, state) => {
  const result = await db.deposit.findByPk(hash);

  if (result == null) {
    return null;
  }

  result.state = state;
  await result.save();
};

const getDeposit = async hash => {
  const result = await db.deposit.findByPk(hash);

  return result != null ? result.toJSON() : null;
};

module.exports = {
  createDeposit,
  updateDeposit,
  getDeposit,
};
