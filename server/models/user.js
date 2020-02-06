'use strict';

const bcrypt = require('bcrypt')

module.exports = (sequelize, DataTypes) => {
  const { Model } = sequelize.Sequelize

  class User extends Model {}

  User.init({
    
    username: {
      type : DataTypes.STRING,
      validate: {
        notEmpty : {
          args: true,
          msg: 'Username must be filled'
        }
      }
    },
    password: {
      type : DataTypes.STRING,
      validate: {
        notEmpty : {
          args: true,
          msg: 'Password must be filled'
        }
      }
    },
    email: {
      type : DataTypes.STRING,
      validate: {
        notEmpty : {
          args: true,
          msg: 'Email must be filled'
        },
        isEmail : {
          args: true,
          msg: 'Email wrong format'
        }
      }
    }
  }, 
  {
    sequelize,
    hooks: {
      beforeCreate : (user, options) => {
        user.password = bcrypt.hashSync(user.password, 15)
      }
    },
  })

  User.associate = function(models) {
    User.hasMany(models.Plan)
  };
  return User;
};