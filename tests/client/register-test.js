/* File has been copied (and/or heavily modified) from the course content,
   provided at
   https://github.com/arcuri82/web_development_and_api_design/blob/master/exercise-solutions/quiz-game/part-10/tests/client/signup-test.jsx
 */


const React = require('react');
const {mount} = require('enzyme');
const {MemoryRouter} = require('react-router-dom');

const {overrideFetch, asyncCheckCondition} = require('../mytest-util.js');
const {getUser, createUser, removeAllUsers} = require('../../src/server/db/userRepo.js');

const {Register} = require("../../src/client/components/Register.jsx");

const {app} = require('../../src/server/app');


function fillForm(driver, id, password, confirm){

  const userIdInput = driver.find("#username").at(0);
  const passwordInput = driver.find("#password").at(0);
  const confirmInput = driver.find("#confirm").at(0);
  const signUpBtn = driver.find("#signupBtn").at(0);

  userIdInput.simulate('change', {target: {value: id}});
  passwordInput.simulate('change', {target: {value: password}});
  confirmInput.simulate('change', {target: {value: confirm}});

  signUpBtn.simulate('click');
}

beforeEach(removeAllUsers);

describe("Should test Register component", () => {
  it("Should test for password mismatch", async () => {

    const mismatch = "Not matching";

    overrideFetch(app);

    let page = null;
    const history = {push: (h) => {page=h}};
    const driver = mount(
      <MemoryRouter initialEntries={["/register"]}>
        <Register history={history}/>
      </MemoryRouter>
    );

    expect(driver.html().includes(mismatch)).toEqual(false);

    fillForm(driver, "foo", "123", "not-matching");

    const error = await asyncCheckCondition(
      () => {
        driver.update();
        return driver.html().includes(mismatch)
      },
      2000, 200);

    expect(error).toEqual(true);
  });

  it("Should fail if user already exists", async () => {

    const userId = "Foo";
    const password = "123";
    createUser(userId, password);

    overrideFetch(app);

    const fetchAndUpdateUserInfo = () => new Promise(resolve => {resolve()});
    let page = null;
    const history = {push: (h) => {page=h}};

    const driver = mount(
      <MemoryRouter initialEntries={["/register"]}>
        <Register setSignIn={fetchAndUpdateUserInfo} history={history} />
      </MemoryRouter>
    );

    fillForm(driver, userId, password, password);

    const failed = await asyncCheckCondition(
      () => {driver.update(); return driver.html().includes('Invalid username/password')},
      2000 ,200);

    expect(failed).toEqual(true);
  });

  it("Should create user", async () =>{

    const userId = "Foo";
    expect(getUser(userId)).toEqual(undefined);

    overrideFetch(app);

    const fetchAndUpdateUserInfo = () => new Promise(resolve => resolve());
    let page = null;
    const history = {push: (h) => {page=h}};

    const driver = mount(
      <MemoryRouter initialEntries={["/signup"]}>
        <Register setSignIn={fetchAndUpdateUserInfo} history={history} />
      </MemoryRouter>
    );

    const password = "123";

    fillForm(driver, userId, password, password);

    const redirected = await asyncCheckCondition(
      () => {return page === "/"},
      2000 ,200);

    expect(redirected).toEqual(true);

    expect(getUser(userId).id).toEqual(userId);
  });
});