import {overrideFetch, asyncCheckCondition, overrideWebSocket} from "../mytest-util.js";

const React = require('react');
const {mount} = require('enzyme');
const {BrowserRouter, MemoryRouter} = require('react-router-dom');

const {Home} = require('../../src/client/components/Home.jsx');

const {app} = require('../../src/server/app.js');

let server;
let port;

function fillForm(driver){

  const inputField = driver.find("#messageArea").first();
  const btn = driver.find("#btn").first();

  inputField.simulate('change', {target: {value: "Something"}});
  btn.simulate('click');

}

describe("Testing the Home component", () => {
  beforeAll(done => {
    server = app.listen(0, ()=> {
      port = server.address().port;
      done();
    });
  });

  afterAll(() => {
    server.close();
  });


  //Remember, we override the fetch and wait, meaning that we WILL get
  //keys with same id. THIS IS FINE!
  it("Should test for home text", async () => {
    overrideFetch(app);
    overrideWebSocket(port);
    const driver = mount(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );

    let displayedMessage;

    const predicate = () => {
      driver.update();
      const html = driver.html();
      return html.includes("Chef");
    };

    displayedMessage = await asyncCheckCondition(predicate, 3000, 100);

    const html = driver.html();
    expect(html.includes("a few seconds ago")).toBe(true);
    expect(displayedMessage).toBe(true);
  });

  it("Should test for signed in username text", async () => {
    overrideFetch(app);
    overrideWebSocket(port);

    const user = "Håvard";
    const fetchAndUpdateUserInfo = () => new Promise(resolve => resolve());

    const driver = mount(
      <BrowserRouter initialEntries={["/home"]}>
        <Home fetchAndUpdateUserInfo={fetchAndUpdateUserInfo} username={user}/>
      </BrowserRouter>
    );

    const html = driver.html();
    fillForm(driver);
    expect(html.includes("Håvard")).toEqual(true);
  });

  it("Should display the posts", async () => {
    overrideFetch(app);
    overrideWebSocket(port);
    const fetchAndUpdateUserInfo = () => new Promise(resolve => resolve());

    const driver = mount(
      <BrowserRouter initialEntries={["/home"]}>
        <Home fetchAndUpdateUserInfo={fetchAndUpdateUserInfo} />
      </BrowserRouter>
    );

    const predicate = () => {
      driver.update();
      const html = driver.html();
      return html.includes("Chef"
        && "Håvard") ;
    };


    let displayedMessage = await asyncCheckCondition(predicate, 3000, 100);
    expect(displayedMessage).toEqual(true);
  });
});