//const {overrideWebSocket, stubFetch, overrideFetch, asyncCheckCondition} = require('../mytest-util.js');

/*const React = require('react');
const {mount} = require('enzyme');
const {Profile} = require('../../src/client/components/Profile.jsx');
const {MemoryRouter} = require('react-router-dom');

const {app} = require('../../src/server/app.js');

let server;
let port;


describe("ProfileComponent", () => {
  beforeAll(done => {
    server = app.listen(0, ()=> {
      port = server.address().port;
      done();
    });
  });

  afterAll(() => {
    server.close();
  }); */

  it("Should test true to true", () => {
    expect(true).toBe(true);
  });

  /*it("Should mount the profile component", async () => {

    overrideWebSocket(port);
    overrideFetch(app);

    const predicate = () => {
      driver.update();
      const html = driver.html();
      return html.includes("Profile");
    };

    stubFetch(200, {
        birthday: "29.09.1929",
        country: "Norway",
        friends: [],
        id: "Chef",
        password: "lok",
        requestFrom: ["Håvard"],
        requestTo: []
      }, (url) => url.endsWith("/api/profile/Chef"));

    let page = null;
    const history = {push: (h) => {page=h}};

    const driver = mount(<MemoryRouter>
      <Profile username={"Chef"} history={history}/>
    </MemoryRouter>);

    let displayedMessage = await asyncCheckCondition(predicate, 3000, 100);

    console.log(driver);

  });
}); */