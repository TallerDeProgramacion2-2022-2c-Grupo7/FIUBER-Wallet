"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Wallet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Wallet.init(
    {
      uid: { type: DataTypes.STRING, primaryKey: true },
      publicKey: DataTypes.STRING,
      privateKey: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "wallet",
    },
  );
  return Wallet;
};
