import {asyncCheckCondition} from "../mytest-util";

const {FriendRequests} = require("../../src/client/components/FriendRequests");

const {MemoryRouter} = require("react-router-dom");

const React = require('react');
const {mount} = require('enzyme');
const {overrideFetch} = require('../mytest-util.js');
const {app} = require('../../src/server/app.js');

describe("FriendRequest Test", () => {
  it("Should mount friend request", async () => {
    overrideFetch(app);

    const driver = mount(
      <MemoryRouter>
        <FriendRequests username={"Chef"}/>
      </MemoryRouter>);

    const predicate = () => {
      driver.update();
      const html = driver.html();
      return html.includes("Håvard");
    };


    let displayedMessage = await asyncCheckCondition(predicate, 3000, 100);

    console.log(driver.html());

  })

});