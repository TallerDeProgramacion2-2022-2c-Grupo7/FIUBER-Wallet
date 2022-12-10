"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Deposit extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Deposit.init(
    {
      hash: { type: DataTypes.STRING, primaryKey: true },
      from: DataTypes.STRING,
      to: DataTypes.STRING,
      amount: DataTypes.NUMBER,
      state: { type: DataTypes.ENUM(["processing", "minted", "failed"]), defaultValue: "processing" },
    },
    {
      sequelize,
      modelName: "deposit",
    },
  );
  return Deposit;
};
