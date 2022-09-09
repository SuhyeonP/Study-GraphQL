const { ApolloServer } = require('apollo-server')
// const _ = require('lodash')

const queries = require('./typedefs-resolvers/_queries')
const mutations = require('./typedefs-resolvers/_mutations')
const equipments = require('./typedefs-resolvers/equipments')
const members = require('./typedefs-resolvers/member')
const groups = require('./typedefs-resolvers/group')

const typeDefs = [
    queries,
    mutations,
    equipments.typeDefs,
    members.typeDefs,
    groups.typeDefs,
]

const resolvers = [
    equipments.resolvers,
    members.resolvers,
    groups.resolvers
]

const server =  new ApolloServer({typeDefs, resolvers})

server.listen().then(({url}) => {
    console.log(`🚀  Server ready at ${url}`)
})
