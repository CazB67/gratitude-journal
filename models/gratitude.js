/* eslint-disable */
module.exports = function (sequelize, DataTypes) {
  const Gratitude = sequelize.define("Gratitude", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    action: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    shareable: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    createdAt : {
      type: DataTypes.DATEONLY,
      defaultValue: DataTypes.NOW,
    }
  });

  Gratitude.associate = function (models){
    Gratitude.belongsTo(models.User);
  };  
  return Gratitude;
};

