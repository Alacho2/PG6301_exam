const request = require('supertest');
const {app} = require('../../src/server/app.js');

async function logUserIn(){
  return await request(app)
    .post('/api/login')
    .send({username: "Ben", password: 1234})
    .set({'Content-Type': 'application/json'});
}

describe("Testing application authentication", () => {
  it("Should test user failed login", async () => {
    const response = await logUserIn();
    expect(response.statusCode).toBe(401)
  });

  it("Should test creation of user", async () => {
    const agent = request.agent(app);
    let response = await agent.post("/api/register")
      .send({username: "Ben", password: "1234"})
      .set({'Content-Type': 'application/json'});

    expect(response.statusCode).toBe(201);

    response = await agent.get("/api/user");

    expect(response.statusCode).toBe(200);
    expect(response.body.userId).toBe("Ben");
    expect(response.body.password).toBeUndefined()
  });

  it("Should test failed user get request", async () => {
    let response = await request(app).get("/api/user");

    expect(response.statusCode).toBe(401)
  });

  it("Should test failed user creation", async  () => {
    let response = await request(app).post("/api/register")
      .send({fakeUsername: "", fakePassword: "1234"})
      .set({'Content-Type': 'application/json'});

    expect(response.statusCode).toBe(400);
    expect(response.body.userId).toBeUndefined()
  });

  //TODO(Håvard) Logout test?

  it("Should test logging a user out", async () => {
    await logUserIn();
    let response = await request(app).post("/api/logout");

    expect(response.statusCode).toBe(204);
  })
});