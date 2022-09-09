const { gql } = require('apollo-server')
const dbWorks = require('../dbWorks')

const typeDefs = gql`
    type Member {
        id: String
        height: Int
        group: String
    }
`;

const resolvers = {
    Query:  {
        members: (parent, args) => dbWorks.getMembers(args),
    },
    Mutation: {
        deleteEquipment: (parent, args) => dbWorks.deleteItem('members', args),
    }
}

module.exports = {
    typeDefs,
    resolvers
}
