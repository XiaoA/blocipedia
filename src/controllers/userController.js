const userQueries = require("../db/queries.users.js");
const passport = require("passport");
const sendgrid = require('./sendgrid');

module.exports = {
    signUp(req, res, next){
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
                    res.redirect("/");
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
                req.flash("notice", "You've successfully signed in!");
                res.redirect("/");
            }
        })
    },

    signOut(req, res, next){
        req.logout();
        req.flash("notice", "You've successfully signed out!");
        res.redirect("/");
    },
    upgradePage(req, res, next){
        res.render("users/upgrade");
    },

    upgrade(req, res, next){
        const token = request.body.stripeToken; // Using Express

        const charge = stripe.charges.create({
            amount: 999,
            currency: 'usd',
            description: 'Example charge',
            source: token,
            statement_descriptor: 'Blocipedia upgrade'
          });

        userQueries.upgrade(req.params.id, (err, user) => {
            if(err && err.type ==="StripeCardError"){
                req.flash("notice", "Your payment was unsuccessful");
                res.redirect("/users/upgrade");
            } else{
                req.flash("notice", "Your payment was successful, you are a Premium Member!");
                res.redirect(`/`);
   
            }
        }) ;
    }



}