'use strict';
module.exports = (sequelize, DataTypes) => {
  
  const { Model } = sequelize.Sequelize

  class Plan extends Model {}

  Plan.init({
    title:{
      type: DataTypes.STRING,
      allowNull : false,
      validate: {
        notNull : { msg: 'Title must be filled'},
        notEmpty : {
          args: true,
          msg: 'Title must be filled'
        }
      }
    },
    province: {
      type : DataTypes.STRING,
      allowNull : false,
      validate: {
        notNull : { msg: 'Province must be filled'},
        notEmpty : {
          args: true,
          msg: 'Province must be filled'
        }
      }
    },
    city: {
      type : DataTypes.STRING,
      allowNull : false,
      validate: {
        notNull : { msg: 'City must be filled'},
        notEmpty : {
          args: true,
          msg: 'City must be filled'
        }
      }
    },
    date_plan: {
      type : DataTypes.DATE,
      allowNull : false,
      validate: {
        notNull : { msg: 'Date must be filled'},
        notEmpty : {
          args: true,
          msg: 'Date plan must be filled'
        }
      }
    },
    itinerary: {
      type : DataTypes.STRING,
      allowNull : false,
      validate: {
        notNull : { msg: 'Itinerary must be filled'},
        notEmpty : {
          args: true,
          msg: 'Itinerary must be filled'
        }
      }
    },
    transportation: {
      type : DataTypes.STRING,
      allowNull : false,
      validate: {
        notNull : { msg: 'Transportation must be filled'},
        notEmpty : {
          args: true,
          msg: 'Transportation must be filled'
        }
      }
    },
    equipment: {
      type : DataTypes.STRING,
      allowNull : false,
      validate: {
        notNull : { msg: 'Equipment must be filled'},
        notEmpty : {
          args: true,
          msg: 'Equipment must be filled'
        }
      }
    },
    budget: {
      type : DataTypes.INTEGER,
      allowNull : false,
      validate: {
        notNull : { msg: 'Budget must be filled'},
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