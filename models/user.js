module.exports = function (sequelize, DataTypes) {
  const User = sequelize.define("User", {
    userId: {
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
      allowNull: false,
    },
  });
// ---Only to be used with passport---
//  User.prototype.validPassword = function (password) {
//    return bcrypt.compareSync(password, this.password);
//  };
//
//  User.addHook("beforeCreate", function (user) {
//    user.password = bcrypt.hashSync(
//      user.password,
//      bcrypt.genSaltSync(10),
//      null
//    );
//  });
  return User;
};
