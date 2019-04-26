const {Home} = require("../../src/client/components/Home");

const {overrideFetch, overrideWebSocket} = require("../mytest-util.js");

const React = require('React');
const {mount} = require('enzyme');
const {app} = require('../../src/server/app.js');

let server;
let port;

describe("Should do tests on home", () => {

  beforeAll(done => {
    server = app.listen(0, ()=> {
      port = server.address().port;
      done();
    });
  });

  afterAll(() => {
    server.close();
  });

  it("Should be a test", () => {

  });

  /*it("Should mount component", () => {
    overrideFetch(app);
    overrideWebSocket(port);

    const driver = mount(<Home username={"Chef"}/>);

    console.log(driver.html());

    setTimeout(() => {
      console.log("Do something");
    },1000);

    expect(driver.html().includes("on your mind")).toBe(true)
  }) */
});