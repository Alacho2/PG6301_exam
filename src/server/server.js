/*
   This file is influenced, but not explictly copied from the course content.
   https://github.com/arcuri82/web_development_and_api_design/blob/master/les07/server_client_together/src/server/server.js
   But how many ways can you write this? :-)
 */

const {app} = require('./app.js');
const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Server started on ${port}`);
});