const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/users/";
const User = require("../../src/db/models").User;
const sequelize = require("../../src/db/models/index").sequelize;

describe("routes : users", () => {

    beforeEach((done) => {

        sequelize.sync({ force: true })
            .then(() => {
                done();
            })
            .catch((err) => {
                console.log(err);
                done();
            });
    });

    describe("GET /users/sign_up", () => {

        it("should render a view with a sign up form", (done) => {
            request.get(`${base}sign_up`, (err, res, body) => {
                expect(err).toBeNull();
                expect(body).toContain("Sign up");
                done();
            });
        });
    });//sign up

    describe("POST /users", () => {

        // #1
        it("should create a new user with valid values and redirect", (done) => {

            const options = {
                url: base,
                form: {
                    name: "Selena",
                    email: "user@example.com",
                    password: "123456789"
                }
            }

            request.post(options,
                (err, res, body) => {

                    User.findOne({ where: { email: "user@example.com" } })
                        .then((user) => {
                            expect(user).not.toBeNull();
                            expect(user.name).toBe("Selena");
                            expect(user.email).toBe("user@example.com");
                            expect(user.id).toBe(1);
                            done();
                        })
                        .catch((err) => {
                            console.log(err);
                            done();
                        });
                }
            );
        });

        it("should not create a new user with invalid attributes and redirect", (done) => {
            request.post(
                {
                    url: base,
                    form: {
                        name: "Justin",
                        email: "no",
                        password: "123456789"
                    }
                },
                (err, res, body) => {
                    User.findOne({ where: { email: "no" } })
                        .then((user) => {
                            expect(user).toBeNull();
                            done();
                        })
                        .catch((err) => {
                            console.log(err);
                            done();
                        });
                }
            );
        });

    });// users

    describe("GET /users/sign_in", () => {

        it("should render a view with a sign in form", (done) => {
            request.get(`${base}sign_in`, (err, res, body) => {
                expect(err).toBeNull();
                expect(body).toContain("Sign in");
                done();
            });
        });

    });//sign in


});