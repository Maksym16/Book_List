const express = require('express');
const graphqlHTTP = require('express-graphql'); //name is !== to package name because name conv

const app = express(); //init express server

app.listen(4000, () => {
  console.log('Welcom to Book List');
})