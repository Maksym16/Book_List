const graphql = require('graphql');
const _ = require('lodash');

const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt, GraphQLList } = graphql;


let books = [
  { name: 'Max', genre: 'Fedorenko', id: '1', authorId: '1' },
  { name: 'Max2', genre: 'Fedorenko', id: '2', authorId: '1' },
  { name: 'Max3', genre: 'Fedorenko', id: '1', authorId: '2' },
  { name: 'Max4', genre: 'Fedorenko', id: '2', authorId: '2' },
];


let authors = [
  { name: 'Yana', age: 1, id: '1' },
  { name: 'Yana2', age: 2, id: '2' },
];

const BookType = new GraphQLObjectType({
  name:'Book',
  fields: () => ({
    id: { type: GraphQLID}, //ID should be type GraphQLID so when we query it id can be passed as a num not a str, under the hood id is still str
    name: { type: GraphQLString},
    genre: { type: GraphQLString},
    author: {
      type: AuthorType,
      resolve: (parent, args) => {
        return _.find(authors, {id: parent.authorId})
      }
    }
  })
})

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: { type: GraphQLID }, //ID should be type GraphQLID so when we query it id can be passed as a num not a str, under the hood id is still str
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      type: new GraphQLList(BookType),
      resolve: (parent, args) => {
        return _.filter(books, {authorId: parent.id})
      }
    },
  }),
});


const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: () => ({
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } }, //thats how we find book
      resolve(parent, args) {
        //code to get data from db/ other source
        //parent - needed for creating relationship
        //args == to args from book feild
        return _.find(books, {id: args.id});
      }
    },

    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID}},
      resolve(parent, args) {
        return _.find(authors, {id: args.id})
      }
    }
  }),
});

module.exports = new GraphQLSchema({ //create new schema and pass root query into it
  query: RootQuery
});