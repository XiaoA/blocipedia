const Collaborator = require("./models").Collaborators;
const User = require("./models").User;
const Wiki = require("./models").Wiki;


module.exports = {

    getAllCollaborators(callback) {
        return Collaborator.all()
            .then((collaborators) => {
                callback(null, collaborators);
            })
            .catch((err) => {
                callback(err);
            })
    },

    addCollaborator(req, callback) {
        User.findOne({ where: { email: req.body.email } })
            .then((user) => {
                if (!user) {
                    req.flash("notice", "The email you entered is not a valid member");
                }
                else {
                    Collaborator.findOne({
                        where: {
                            userId: user.id,
                            wikiId: req.params.wikiId
                        }
                    })
                        .then((collaborator) => {
                            if (!collaborator) {
                                let newCollaborator = {
                                    email: req.body.email,
                                    userId: user.id,
                                    wikiId: req.params.wikiId
                                }
                                return Collaborator.create(newCollaborator)
                                    .then((collaborator) => {
                                        callback(null, collaborator);
                                    })
                                    .catch((err) => {
                                        callback(err);
                                    })
                            } else {
                                req.flash('notice', 'Already a collaborator');
                            }
                        })
                }
            })

    },

    getCollaborator(id, callback) {
        return Collaborator.findById(id)
            .then((collaborator) => {
                callback(null, collaborator);
            })
            .catch((err) => {
                callback(err);
            })
    },

    deleteCollaborator(id, callback) {
        return Collaborator.destroy({
            where: { id }
        })
            .then((collaborator) => {
                callback(null, collaborator);
            })
            .catch((err) => {
                callback(err);
            })
    }

}