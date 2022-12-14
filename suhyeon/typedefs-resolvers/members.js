const { gql } = require('apollo-server')
const dbWorks = require('../dbWorks')

const typeDefs = gql`
    type Member {
        id: ID!
        is_real_name: Boolean
        role: String
        group: String
    }
`;
const resolvers = {
    Query: {
        members: (parent, args) => dbWorks.getMembers(args),
        member: (parent, args) => dbWorks.getMember(args),
        getRoleMembers: (parent, args) => dbWorks.getRoleMembers(args),
    },
    Mutation: {
        deleteMember: (parent, args) => dbWorks.deleteItem('members', args)
    }
}

module.exports = {typeDefs, resolvers}
