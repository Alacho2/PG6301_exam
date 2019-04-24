const React = require('react');
const {mount} = require('enzyme');
const {MemoryRouter} = require('react-router-dom');

const {NotFound} = require('../../src/client/components/NotFound.jsx');

describe("Testing the NotFoundComponent", () => {
  it("Should go to arbitrary page and find nothing", () => {
    let page = null;
    const history = {push: (h) => {page=h}};

    const driver = mount(
      <MemoryRouter>
        <NotFound history={history}/>
      </MemoryRouter>);

    expect(driver.html().includes("monkeys")).toBe(true);
  })
});