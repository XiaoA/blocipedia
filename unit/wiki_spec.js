const sequelize = require("../../src/db/models/index").sequelize;
const Wiki = require("../../src/db/models").Wiki;


describe("Wiki", () => {

    beforeEach((done) => {
        this.wiki;
        this.user;

        sequelize.sync({ force: true })
            .then(() => {
                done();
            })
            .catch((err) => {
                console.log(err);
                done();
            });
    });

    describe("#create()", () => {

        it("should create a wiki with a title and description", (done) => {
            Wiki.create({
                title: "test tittle one",
                body: "description for tittle one"
            })
                .then((wiki) => {
                    expect(wiki.title).toBe("test tittle one");
                    expect(wiki.body).toBe("description for tittle one");
                    done();
                })
                .catch((err) => {
                    console.log(err);
                    done();
                })
        });

        it("should not create a wiki without a title or description", (done) => {
            Wiki.create({
                title: "test tittle one",
                //body: "description for tittle one"
            })
                .then((wiki) => {
                    Wiki.create({
                        //title: "test tittle one",
                        body: "description for tittle one"
                    })
                        .then((wiki) => {
                            done();
                        })
                        .catch((err) => {
                            console.log(err);
                            expect(err.message).toContain("Wiki.body cannot be null");
                            expect(err.message).toContain("Wiki.title cannot be null");
                            done();
                        });
                    done();
                })
                .catch((err) => {
                    console.log(err);
                    done();
                });
        });

    });

    // describe("#setUser()", () => {
    //     it("should associate a user and a wiki together", done => {
    //       User.create({
    //         email: "example@email.com",
    //         password: "1234567890"
    //       }).then(newUser => {
    //         expect(this.wiki.userId).toBe(this.user.id);
    
    //         this.wiki.setUser(newUser).then(wiki => {
    //           expect(this.wiki.userId).toBe(newUser.id);
    //           done();
    //         });
    //       });
    //     });
    //   });
    
    //   describe("#getUser()", () => {
    //     it("should return the associated user", done => {
    //       this.wiki.getUser().then(associatedUser => {
    //         expect(associatedUser.email).toBe("example@email.com");
    //         done();
    //       });
    //     });
    //   });

});