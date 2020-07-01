const supertest = require('supertest');
const index = require('../app')

let app;
let server;

beforeAll(() => {
    app = index.app;
});
afterAll(() => {
    const server = index.server;
    server.close();
});

describe('GET routes', () => {
    it('GET /', done => {
        supertest(app)
            .get('/')
            .expect(200, "hello world")
            .end(done)
    })

    it("GET /movies", (done) => {
        supertest(app)
            .get("/movies")
            .expect(200)
            .then(resp => {
                //console.log(resp.body[0])
                expect(resp.body[0]['movie_id']).toBe(1)
                done()
            })
    })

    it("GET /movies/:id", (done) => {
        supertest(app)
        .get("/movies/2")
        .expect(200)
        .then(resp => {
            expect(resp.body[0]['title']).toBe("Star Wars: Episode IV - A New Hope")
            done()
        })

    })

    it("GET movies?search=<query>", (done) => {
        supertest(app)
        .get("/movies?search=The+Yoda+Chronicles")
        .expect(200)
        .then(resp => {
            expect(resp.body[0]['movie_id']).toBe(303)
            done()
        })
    })

    it("GET reviews/:movieId", (done) => {
        supertest(app)
        .get("/reviews/3")
        .expect(200)
        .then(resp => {
            expect(resp.body[0]['review_title']).toBe('An iconic film')
            done()
        })
    })
})

describe('POST routes', () => { 
    it("POST reviews", (done) => {
        supertest(app)
        .post("/reviews/")
        .send({movie_id: 1, review_text: "This is the best ever", review_title: "Glowing review", reviewer_id: 2})
        .expect(200)
        .end(done)
    })

    /*
  email varchar(50),
  first_name varchar(255),
  last_name varchar(255),
  password varchar(100),
    */

    it("POST register, which also deletes the user", (done) => {
        const userInfo = {first_name: "Joe",last_name: "Mama", password: "l1k3scandy", email: "youhavefailedme@deathstar.com"}
        //1337
        supertest(app)
        .post("/register")
        .send(userInfo)
        .expect(200)
        .end(done)
        
    })

    it("POST delete the user", (done) => {
        //const userInfo = {first_name: "Joe",last_name: "Mama", password: "l1k3scandy", email: "youhavefailedme@deathstar.com"}
        //1337
        supertest(app)
        .delete("/register")
        .send({email: "youhavefailedme@deathstar.com"})
        .expect(200)
        .end(done)
    })
})
