'use strict';
module.exports = (sequelize, DataTypes) => {
  var Wiki = sequelize.define('Wiki', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    body: {
      type: DataTypes.STRING,
      allowNull: false
    },
    private: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
       onDelete: "CASCADE",
       allowNull: false,
      references: {
        model: "Users",
        key: "id",
        as: "userId"
    
    }
  }
  }, {});
  Wiki.associate = function(models) {
    // associations can be defined here
    Wiki.belongsTo(models.User, {
      foreignKey: "userId",
      onDelete: "CASCADE",
    });
    Wiki.hasMany(models.Collaborators, {
      foreignKey: "wikiId",
      as: "collaborators"
    });
  };
  return Wiki;
};