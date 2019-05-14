const Collaborator = require("./models").Collaborator;
const User = require("./models").User;
const Wiki = require("./models").Wiki;
const Authorizer = require("../policies/application");

module.exports = {

    createCollaborator(req, callback){
        // console.log("createCo.")
        // if (req.user.email == req.body.collaborator) {
        //     return callback("You cannot add yourself as a collaborator");
        // }

        // User.findOne({
        //         where: {
        //             email: req.body.collaborator
        //         }
        //     })
        //     .then((user) => {
        //         if (!user) {
        //             return callback("User does not exist")
        //         }

        //         Collaborator.findOne({
        //                 where: {
        //                     userId: user.id,
        //                     wikiId: req.params.wikiId
        //                 }
        //             })
        //             .then((collaborator) => {
        //                 if (collaborator) {
        //                     return callback("This user is already a collaborator on this wiki")
        //                 }

        //                 let newCollaborator = {
        //                     userId: user.id,
        //                     wikiId: req.params.wikiId
        //                 };
        //                 return Collaborator.create({
        //                         userId: user.id,
        //                         wikiId: req.params.wikiId
        //                     })
        //                     .then((collaborator) => {
        //                         callback(null, collaborator);
        //                     })
        //                     .catch((err) => {
        //                         callback("User can't be found!")
        //                     })
        //             })
        //     })

        if (req.user.email == req.body.collaborator){
          return callback("Cannot add yourself to collaborators!");
        }
        User.findAll({
          where: {
            email: req.body.collaborator
          }
        })
        .then((users)=>{
          if(!users[0]){
            return callback("User not found.");
          }
          Collaborator.findAll({
            where: {
              userId: users[0].id,
              wikiId: req.params.wikiId,
            }
          })
          .then((collaborators)=>{
            if(collaborators.length != 0){
              return callback(`${req.body.collaborator} is already a collaborator on this wiki.`);
            }
            let newCollaborator = {
              userId: users[0].id,
              wikiId: req.params.wikiId
            };
            return Collaborator.create(newCollaborator)
            .then((collaborator) => {
              callback(null, collaborator);
            })
            .catch((err) => {
              callback(err, null);
            })
          })
          .catch((err)=>{
            callback(err, null);
          })
        })
        .catch((err)=>{
          callback(err, null);
        })
  },
  
    deleteCollaborator(req, callback){
      let userId = req.body.collaborator;
      let wikiId = req.params.wikiId;
  
      const authorized = new Authorizer(req.user, wiki, userId).destroy();
  
      if(authorized){
        Collaborator.destroy({
            where: {
              userId: userId,
              wikiId: wikiId
            }
          })
          .then((deletedRecordsCount) => {
            callback(null, deletedRecordsCount);
          })
          .catch((err) => {
            callback(err);
          });
        } else {
          req.flash("notice", "You are not authorized to do that.")
          callback(401);
        }
      }
  
  }
