const { gql } = require('apollo-server')

const typeDefs = gql`
    type Query {
        members: [Member]
        groups: [Group]
        group(id: String): Group
        getRoleMembers(role: RoleType): [Member]
        roles: [Role]
        member(id: String): Member
    }
`;

module.exports = typeDefs

