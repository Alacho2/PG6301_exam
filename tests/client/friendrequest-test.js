
const {FriendRequests} = require("../../src/client/components/FriendRequests");

const {MemoryRouter} = require("react-router-dom");

const React = require('react');
const {mount} = require('enzyme');
const {overrideFetch, asyncCheckCondition, stubFetch} = require('../mytest-util.js');
const {app} = require('../../src/server/app.js');

describe("FriendRequest Test", () => {
  it("Should mount friend request", async () => {
    overrideFetch(app);

    const driver = mount(
      <MemoryRouter initialEntries={["/"]}>
        <FriendRequests username={"Håvard"}/>
      </MemoryRouter>);

    driver.setState({requests: ["Håvard"]});
    driver.update();

    const predicate = () => {
      driver.update();
      const html = driver.html();
      return html.includes('Accept');
    };

    let displayedMessage = await asyncCheckCondition(predicate, 3000, 100);

    expect(driver.html().includes("requests")).toBe(true)

  })

  it("Should mount friend request and render some requests", async () => {
    stubFetch(200,
      ["Håvard"],
      (url) => url.endsWith("/api/friend/Chef"));

    const driver = mount(
      <MemoryRouter initialEntries={["/"]}>
        <FriendRequests username={"Håvard"}/>
      </MemoryRouter>);

    const predicate = () => {
      driver.update();
      const html = driver.html();
      return html.includes('Accept');
    };

    let displayedMessage = await asyncCheckCondition(predicate, 3000, 100);

    const acceptBtn = driver.find("#acceptBtn").first();
    acceptBtn.simulate('click');

    expect(displayedMessage).toBe(true);

    expect(driver.html().includes("No requests")).toBe(false);

  })

});