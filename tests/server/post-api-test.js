const {getAllPosts} = require("../../src/server/db/postRepo");

const request = require('supertest');
const {app} = require('../../src/server/app.js');

describe("Testing the menu api", () => {

  it("Should get one valid and invalid post", async () => {
    const responseValid = await request(app).get('/api/posts/1');
    expect(responseValid.body.id).toBe("1");
    expect(responseValid.status).toBe(200);

    const responseFailed = await request(app).get('/api/posts/4');

    expect(responseFailed.status).toBe(404)
  });

  it("Should get all posts", async () => {
    const response = await request(app).get("/api/posts");

    expect(response.body[1].writer.id).toBe("Håvard");
    expect(response.body.length).toBeGreaterThanOrEqual(3);
  });

  it("Should create a post", async () => {
    const response = await request(app).post("/api/posts")
      .send({author: "Håvard", text: "Candy for all"})
      .set('Content-Type', 'application/json');

      expect(response.status).toBe(201);
      expect(getAllPosts().length).toBeGreaterThan(3);
  })
});