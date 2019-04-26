const {overrideFetch} = require("../mytest-util.js");

const clientUtil = require('../../src/client/client-util.js');

const {app} = require('../../src/server/app.js');

describe("Should test logic", () => {
  it("Should perform profile fetch test", async () => {
    overrideFetch(app);
    const profile = await clientUtil.getProfile("Chef");

    expect(profile.status).toBe(200);
  })

  it("Should perform askFriendShip fetch test", async () => {
    overrideFetch(app);
    const friendship = await clientUtil.askFriendship("Håvard", "Chef");

    expect(friendship.status).toBe(201);
  })
});