'use strict';
module.exports = (sequelize, DataTypes) => {
  var Collaborator = sequelize.define(
    'Collaborator',
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      wikiId: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    },
    {}
  );
  Collaborator.associate = function(models) {
    // associations can be defined here
    Collaborator.belongsTo(models.Wiki, {
      foreignKey: "wikiId",
      onDelete: "CASCADE"
    });

    Collaborator.belongsTo(models.User, {
      foreignKey: "userId",
      onDelete: "CASCADE"
    });

    Collaborator.addScope("collaboratorsFor", (wikiId) => {
      return {
      include: [{
        model: models.User
      }],
      where: {wikiId: wikiId},
      order: [["createdAt", "ASC"]]
      }
    });

    Collaborator.addScope("userCollaborationsFor", (userId) => {
      return{
        include: [{
          model: models.Wiki
        }],
        where: {userId: userId},
        order: [["createdAt", "ASC"]]
      }
    });

  };
  return Collaborator;
};