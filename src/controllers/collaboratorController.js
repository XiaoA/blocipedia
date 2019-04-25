const collaboratorQueries = require("../db/queries.collaborators.js");
const wikiQueries = require("../db/queries.wikis.js");

const User = require("../db/models").User;

module.exports = {

    index(req, res, next) {
        collaboratorQueries.getAllCollaborators((err, collaborators) => {
            if (err) {
                res.redirect(500, "static/index");
            } else {
                res.render("collaborators/show", { collaborator });
            }
        })
    },

    newCollaboratorForm(req, res, next) {
        res.render("collaborators/new", { wikiId: req.params.wikiId });

    },

    create(req, res, next) {
        collaboratorQueries.addCollaborator(req, (err, collaborator) => {
            if (err) {
                console.log(err);
                res.flash("error", err);
            } else {
                res.redirect(req.headers.referer);
            }
        });
    },

    show(req, res, next) {
        collaboratorQueries.getCollaborator(req.params.id, (err, collaborator) => {
            if (err || collaborator == null) {
                res.redirect(404, "/");
            } else {
                res.render("collaborators/show", { collaborator });
            }
        });
    },

    destroy(req, res, next) {
        collaboratorQueries.deleteCollaborator(req.params.id, (err, collaborator) => {
            if (err) {
                res.redirect(500, `/wikis/${req.params.wikiId}/collaborators/${req.params.id}`);
            } else {
                res.redirect(303, `/wikis/${req.params.wikiId}`);
            }
        });
    },
}