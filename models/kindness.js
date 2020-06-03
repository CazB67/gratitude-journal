/* eslint-disable */
module.exports = function (sequelize, DataTypes) {
    const Kindness = sequelize.define("Kindness", {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      action: {
        type: DataTypes.STRING,
        allowNull: false,
      }
    });
    return Kindness;
  };