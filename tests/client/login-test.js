/* File has been copied (and/or heavily modified) from the course content,
  provided at
  https://github.com/arcuri82/web_development_and_api_design/blob/master/exercise-solutions/quiz-game/part-10/tests/client/login-test.jsx
 */

const React = require('react');
const {Login} = require("../../src/client/components/Login");
const {app} = require('../../src/server/app.js');
const {asyncCheckCondition} = require("../mytest-util");
const {mount} = require('enzyme');
const {overrideFetch} = require("../mytest-util");
const {MemoryRouter} = require('react-router-dom');

const {createUser} = require('../../src/server/db/userRepo.js');

function fillForm(driver, id, password, confirm){

  const userIdInput = driver.find("#username").at(0);
  const passwordInput = driver.find("#password").at(0);
  const signUpBtn = driver.find("#btn").at(0);



  userIdInput.simulate('change', {target: {value: id}});
  passwordInput.simulate('change', {target: {value: password}});

  signUpBtn.simulate('click');
}

describe("LoginComponent", () => {
  it("Should check for login to have error", async () => {
    overrideFetch(app);

    let page = null;
    const history = {push: (h) => {page=h}};
    const driver = mount(
      <MemoryRouter initialEntries={["/login"]}>
        <Login history={history}/>
      </MemoryRouter>);

    console.log(driver.html());

    fillForm(driver, "Håvard", "1234");
    const error = await asyncCheckCondition(
      () => {driver.update(); return driver.html().includes("Invalid username/password")},
      2000 ,200);

    expect(error).toEqual(true);
  });

  it("Should test for valid login", async () => {

    const userId = "Foo";
    const password = "123";
    createUser(userId, password);

    overrideFetch(app);

    const fetchAndUpdateUserInfo = () => new Promise(resolve => resolve());
    let page = null;
    const history = {
      push: (h) => {
        page = h
      }
    };

    const driver = mount(
      <MemoryRouter initialEntries={["/login"]}>
        <Login setSignIn={fetchAndUpdateUserInfo} history={history}/>
      </MemoryRouter>
    );
    fillForm(driver, userId, password);

    const redirected = await asyncCheckCondition(
      () => {
        return page === "/"
      },
      2000, 200);
    expect(redirected).toEqual(true);
  });
});
