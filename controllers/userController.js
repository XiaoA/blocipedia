const userQueries = require("../db/queries.users.js");
const passport = require("passport");
const sendgrid = require('./sendgrid');
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const User = require("../db/models/").User;
const Wiki = require("../db/models/").Wiki;
const wikiQueries = require("../db/queries.wikis.js");
const Collaborator = require("../db/models").Collaborator;
const Authorizer = require("../policies/wiki");
module.exports = {
    signUp(req, res, next) {
        res.render("users/sign_up");
    },

    create(req, res, next) {

        let newUser = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            passwordConfirmation: req.body.password_conf
        };

        userQueries.createUser(newUser, (err, user) => {
            if (err) {
                req.flash("error", err);
                res.redirect("/users/sign_up");
            } else {
                sendgrid.newUserEmail(newUser.email, newUser.name);
                passport.authenticate("local")(req, res, () => {

                    req.flash("notice", "You've successfully signed in!");
                    res.redirect("/users/profile");
                })
            }
        });
    },

    signInForm(req, res, next) {
        res.render("users/sign_in");
    },
    signIn(req, res, next) {
        passport.authenticate("local")(req, res, function () {
            if (!req.user) {
                req.flash("notice", "Sign in failed. Please try again.")
                res.redirect("/users/sign_in");
            } else {
                req.flash("notice", "You've successfully signed in!!!!");
                res.redirect("/users/profile");
            }
        })
    },

    signOut(req, res, next) {
        req.logout();
        req.flash("notice", "You've successfully signed out!");
        res.redirect("/");
    },

    show(req, res, next){
        userQueries.getUser(req.user.id, (err, user) => {
          if(err || user === undefined){
            req.flash("notice", "No user found with that ID");
            res.redirect("/");
          } else{
            res.render("users/profile", {user});
          }
        });
      },

    upgrade(req, res, next) {

        const token = req.body.stripeToken; // Using Express
        const charge = stripe.charges.create({
            amount: 1500,
            currency: 'usd',
            description: 'upgrade to premium',
            source: token,
            statement_descriptor: 'Blocipedia upgrade'
        });

        userQueries.upgradeUser(req.params.id, (err, user) => {
            if (err && err.type === "StripeCardError") {
                req.flash("notice", "Your payment was unsuccessful");
                res.redirect("/users/profile");
            } else {
                req.flash("notice", "Your payment was successful, you are a Premium Member!");
                res.redirect(`/users/${req.params.id}`);

            }
        });
    },

 
    downgrade(req, res, next) {
       
        userQueries.downgradeUser(req.params.id, (err, user) => {
            if(err || user === null){
                req.flash("notice", "You are no longer a premium user.");
                res.redirect("/");
              } else{
                req.flash("notice", "Your account has been reverted back to standard");
                res.redirect(`/users/${req.params.id}`);
              }
            });
          
  
    },

    showCollaborations(req, res, next) {
        userQueries.getUser(req.user.id, (err, result) => {
            user = result["user"];
            collaborations = result["collaborations"];
            if(err || user == null) {
                res.redirect(404, "/");
            } else {
                res.render("users/collaborations", {user, collaborations});
                }
          });
        }

}