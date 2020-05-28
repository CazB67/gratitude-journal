/* eslint-disable */
module.exports = function (sequelize, DataTypes) {
  const Gratitude = sequelize.define("Gratitude", {
    gratitudeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    gratitude: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    action: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    public: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  });

  Gratitude.associate = function (models){
    Gratitude.belongsTo(models.User, {
      foreignKey: "userId"
    });
  }
  return Gratitude;
};
