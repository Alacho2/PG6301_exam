const {removeAllUsers, createUser} = require( "../../src/server/db/userRepo.js");

const request = require('supertest');
const {app} = require('../../src/server/app.js');

describe("FriendRoutes", () => {

  afterEach(() => {removeAllUsers()});

  beforeEach(() => {
    createUser("Ben", 1234, "25.05.1994", "Norway");
    createUser("Jerry", 1234, "29.09.1929", "Norway");
  });

  it("Should making a friend request", async () => {
    const responseOne = await request(app).post("/api/friend")
    .send({userFrom: "Ben", userTo: "Jerry"})
    .set('Content-Type', 'application/json');

  expect(responseOne.status).toBe(201);

  const responseTwo = await request(app).post("/api/friend")
    .send({userFrom: "Ben", userTo: "Jerry"})
    .set('Content-Type', 'application/json');
  expect(responseTwo.status).toBe(304)
  });
});