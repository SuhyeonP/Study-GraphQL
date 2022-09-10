const { gql } = require('apollo-server')

const typeDefs = gql`
    type Query {
        members: [Member]
        groups: [Group]
        roles: [Role]
        member(id: String): Member
    }
`;

module.exports = typeDefs

