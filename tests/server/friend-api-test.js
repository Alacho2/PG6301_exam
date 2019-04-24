const request = require('supertest');
const {app} = require('../../src/server/app.js');

describe("FriendRoutes", () => {
  it("Should making a friend request", async () => {
    const responseOne = await request(app).post("/api/friend")
    .send({userFrom: "Håvard", userTo: "Chef"})
    .set('Content-Type', 'application/json');

  expect(responseOne.status).toBe(201);

  const responseTwo = await request(app).post("/api/friend")
    .send({userFrom: "Håvard", userTo: "Chef"})
    .set('Content-Type', 'application/json');
  expect(responseTwo.status).toBe(304)
  });
});