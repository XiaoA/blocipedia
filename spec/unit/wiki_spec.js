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

});