const express = require('express');
const {graphqlHTTP} = require('express-graphql');
const schema = require('./schema/schema');

const app = express();

// bind express with graphql
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true, //we want to use this tools when do /graphql req 
}));
app.listen(4000, () => {
  console.log('Welcom to Book List');
})