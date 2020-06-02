
var bcrypt = require("bcryptjs");
module.exports = function (sequelize, DataTypes) {
  const User = sequelize.define("User", {
    facebookId: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },
    facebookToken: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },
    facebookName: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });

  // Creating a custom metho d for our User model. This will check if an unhashed password entered by the user can be compared to the hashed password stored in our database
  User.prototype.validPassword = function (password) {
    if (this.password) {
      return bcrypt.compareSync(password, this.password);
    }
  };
  // Hooks are automatic methods that run during various phases of the User Model lifecycle
  // In this case, before a User is created, we will automatically hash their password
  User.addHook("beforeCreate", function (user) {
    if (user.password) {
      user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
    }
  });
  return User;
};
