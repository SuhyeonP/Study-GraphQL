const { gql } = require('apollo-server')
const dbWorks = require("../dbWorks");

const typeDefs = gql`
    type Group {
        id: String
        when: Int
    }
`;


const resolvers = {
    Query:  {
        groups: (parent, args) => dbWorks.getGroups(args),
    },
    Mutation: {
        deleteEquipment: (parent, args) => dbWorks.deleteItem('groups', args),
    }
}

module.exports = {
    typeDefs,
    resolvers
}
