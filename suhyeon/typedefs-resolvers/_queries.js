const { gql } = require('apollo-server')

const typeDefs = gql`
    type Query {
        members: [Member]
        groups: [Group]
        roles: [Role]
    }
`;

module.exports = typeDefs

