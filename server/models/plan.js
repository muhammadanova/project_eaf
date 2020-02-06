'use strict';
module.exports = (sequelize, DataTypes) => {
  const { Model } = sequelize.Sequelize

  class Plan extends Model {}

  Plan.init({
    province: {
      type : DataTypes.STRING,
      validate: {
        notEmpty : {
          args: true,
          msg: 'Province must be filled'
        }
      }
    },
    city: {
      type : DataTypes.STRING,
      validate: {
        notEmpty : {
          args: true,
          msg: 'City must be filled'
        }
      }
    },
    date_plan: {
      type : DataTypes.DATE,
      validate: {
        notEmpty : {
          args: true,
          msg: 'Date plan must be filled'
        }
      }
    },
    itinerary: {
      type : DataTypes.STRING,
      validate: {
        notEmpty : {
          args: true,
          msg: 'Itinerary must be filled'
        }
      }
    },
    transportation: {
      type : DataTypes.STRING,
      validate: {
        notEmpty : {
          args: true,
          msg: 'Transportation must be filled'
        }
      }
    },
    equipment: {
      type : DataTypes.STRING,
      validate: {
        notEmpty : {
          args: true,
          msg: 'Equipment must be filled'
        }
      }
    },
    budget: {
      type : DataTypes.INTEGER,
      validate: {
        notEmpty : {
          args: true,
          msg: 'Budget must be filled'
        }
      }
    },
    UserId: DataTypes.INTEGER
  },
  {
    sequelize
  })

  Plan.associate = function(models) {
    Plan.belongsTo(models.User)
  };

  return Plan;
};