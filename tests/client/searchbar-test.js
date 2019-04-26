const {MemoryRouter} = require( "react-router-dom");

const {SearchBar} = require( "../../src/client/components/SearchBar");

const {overrideFetch, stubFetch} = require("../mytest-util.js");

const React = require('react');
const {mount} = require('enzyme');

const {app} = require('../../src/server/app.js');


describe("Search Bar Component test", () => {
  it("Should mount the search bar", () => {
    overrideFetch(app);

    const driver = mount(
      <MemoryRouter>
        <SearchBar />
      </MemoryRouter>);

    expect(driver.html().includes("Search for")).toBe(true)
  })
});