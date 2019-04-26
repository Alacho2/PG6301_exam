const {
  createUser,
  getUser,
  removeUser,
  askForFriendship,
  removeAllUsers,
  getUserInfo,
  verifyUser
} = require('../../src/server/db/userRepo.js');


describe("UserRepo", () => {

  afterEach(() => {removeAllUsers()});

  beforeEach(() => {
    createUser("Ben", 1234, "25.05.1994", "Norway");
    createUser("Jerry", 1234, "29.09.1929", "Norway");
  });

  it("Should delete a user from the repo", () => {
    expect(getUser("Ben")).toBeDefined();

    removeUser("Ben");
    expect(getUser("Ben")).toEqual(undefined)
  });

  it("Should ask for friendship", () => {
    const askOneTime = askForFriendship("Ben", "Jerry");

    expect(getUser("Ben").requestTo[0]).toBe("Jerry");
    expect(getUser("Jerry").requestFrom[0]).toBe("Ben");
    expect(askOneTime).toBe(true);
    const askAgain = askForFriendship("Ben", "Jerry");

    expect(askAgain).toBe(false);
  });

  it("Should fail creating a user", () => {
    const result = createUser("Ben", 1234, "25.05.1994", "Norway");
    expect(result).toBe(false)
  });

  it("Should remove all users", () => {
    removeAllUsers();

    expect(getUser("Ben")).toEqual(undefined)
  });

  it("Should verify users password", () => {
    const verify = verifyUser("Ben", 1234);
    expect(verify).toBe(true)
  });
});