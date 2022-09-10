const { gql } = require('apollo-server')

const typeDefs = gql`
    type Mutation {
        deleteMember(id: String): Member
    }
`;

module.exports = typeDefs
