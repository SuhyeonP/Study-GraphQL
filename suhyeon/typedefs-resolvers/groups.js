const { gql } = require('apollo-server')
const dbWorks = require('../dbWorks')

const typeDefs = gql`
    type Group {
        id: ID!
        member_count: Int
        debut_at: Int
        sex: Sex!
    }
`;

const resolvers = {
    Query: {
        groups: (parent, args) => dbWorks.getGroups(args),
    }
}

module.exports = {typeDefs, resolvers}
