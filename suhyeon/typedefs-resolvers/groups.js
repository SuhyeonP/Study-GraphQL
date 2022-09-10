const { gql } = require('apollo-server')
const dbWorks = require('../dbWorks')

const typeDefs = gql`
    type Group {
        id: ID!
        member_count: Int
        debut_at: Int
        sex: Sex!
        members: [Member]
    }
`;

const resolvers = {
    Query: {
        groups: (parent, args) => dbWorks.getGroups(args),
        group: (parent, args) => dbWorks.getGroup(args),
    }
}

module.exports = {typeDefs, resolvers}
