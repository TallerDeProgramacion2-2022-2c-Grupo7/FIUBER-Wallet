"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Withdraw extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Withdraw.init(
    {
      hash: { type: DataTypes.STRING, primaryKey: true },
      to: DataTypes.STRING,
      amount: DataTypes.NUMBER,
      state: { type: DataTypes.ENUM(["processing", "minted", "failed"]), defaultValue: "processing" },
    },
    {
      sequelize,
      modelName: "withdraw",
    },
  );
  return Withdraw;
};
