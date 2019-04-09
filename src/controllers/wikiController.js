const wikiQueries = require("../db/queries.wikis.js");

module.exports = {
    index(req, res, next) {
        //res.send("TODO: list all wikis");

        wikiQueries.getAllWikis((err, wikis) => {

            if (err) {
                res.redirect(500, "static/index");
            } else {
                res.render("wikis/index", { wikis });
            }
        })
    }

    
}