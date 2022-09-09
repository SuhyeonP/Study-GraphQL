const { gql } = require('apollo-server')

const typeDefs = gql`
    type Query {
        equipments: [Equipment]
        members: [Member]
        groups: [Group]
    }
`

module.exports = typeDefs
