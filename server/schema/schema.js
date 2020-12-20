const graphql = require('grap hql');
const _ = require('lodash');

const { GraphQLObjectType, GraphQLString, GraphQLSchema } = graphql;

const BookType = new GraphQLObjectType({
  name:'Book',
  fields: () => ({
    id: { type: GraphQLString},
    name: { type: GraphQLString},
    genre: { type: GraphQLString},
  })
})

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: () => ({
    book: {
      type: BookType,
      args: { id: { type: GraphQLString } }, //thats how we find book
      resolve(parent, args) {
        //code to get data from db/ other source
        //parent - needed for creating relationship
        //args == to args from book feild
        return _.find(books, {id: args.id});
      }
    },
  }),
});

module.export = new GraphQLSchema({ //create new schema and pass root query into it
  query: RootQuery
});