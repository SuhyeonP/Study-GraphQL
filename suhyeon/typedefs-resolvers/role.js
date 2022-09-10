const { gql } = require('apollo-server')
const dbWorks = require('../dbWorks')

const typeDefs = gql`
    type Role {
        id: ID!
    }
`;

const resolvers = {
    Query: {
        roles: (parent, args) =>  dbWorks.getRoles(args)
    }
}

module.exports = {typeDefs, resolvers}
