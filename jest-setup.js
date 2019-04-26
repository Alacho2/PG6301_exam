/*
  NOTE - File has been copied (and to some degree extended/modified) from
  course content by
  https://github.com/arcuri82/web_development_and_api_design/blob/master/exercise-solutions/quiz-game/part-10/tests/jest-setup.js

 */

const {configure } = require('enzyme/build');
const jsdom = require('jsdom');
const Adapter = require('enzyme-adapter-react-16/build');

function setUpDomEnvironment() {
  const { JSDOM } = jsdom;
  const dom = new JSDOM('<!doctype html><html><body></body></html>', {url: 'http://localhost/'});
  const { window } = dom;

  global.window = window;
  global.document = window.document;
  global.location = window.location;
  global.navigator = {userAgent: 'node.js'};
  copyProps(window, global);
}

function copyProps(src, target) {
  const props = Object.getOwnPropertyNames(src)
    .filter(prop => typeof target[prop] === 'undefined')
    .map(prop => Object.getOwnPropertyDescriptor(src, prop));
  Object.defineProperties(target, props);
}

setUpDomEnvironment();

configure({ adapter: new Adapter() });