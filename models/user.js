'use strict';

var bcrypt = require('bcrypt');

module.exports = function(sequelize, DataTypes) {
  var user = sequelize.define('user', {
    name: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [1, 254],
          msg: 'Name must be between 1 and 254 characters'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          msg: 'Invalid email address'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [8, 254],
          msg: 'Password must be between 8 and 254 characters'
        }
      }
    },
    linkedinlink: DataTypes.STRING,
    githublink: DataTypes.STRING,
    dribblelink: DataTypes.STRING,
    personalurl: DataTypes.STRING,
    companyname: DataTypes.STRING,
    companyurl: DataTypes.STRING,
    slackId: DataTypes.STRING,
    slackToken: DataTypes.STRING,
    bio: DataTypes.TEXT
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        models.user.belongsToMany(models.event, { through: "usersEventsRoles", foreignKey: 'eventsId' }),
        models.user.belongsToMany(models.role, { through: "usersEventsRoles", foreignKey: 'rolesId' })
      }
    },
    instanceMethods: {
      validPassword: function(password) {
        return bcrypt.compareSync(password, this.password);
      },
      toJSON: function() {
        var jsonUser = this.get();
        delete jsonUser.password;
        return jsonUser;
      }
    },
    hooks: {
      beforeCreate: function(createdUser, options, cb) {
        // hash password and save hash to user
        var hash = bcrypt.hashSync(createdUser.password, 10);
        createdUser.password = hash;
        cb(null, createdUser);
      }
    }
  });
  return user;
};
