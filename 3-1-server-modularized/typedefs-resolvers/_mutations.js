const { gql } = require('apollo-server')

const typeDefs = gql`
    type Mutation {
      deleteEquipment(id: String): Equipment
      deleteMember(id: String): Member
      deleteGroup(id: String): Group
    }
`

module.exports = typeDefs
