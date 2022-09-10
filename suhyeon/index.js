const { ApolloServer } = require('apollo-server')

const queries = require('./typedefs-resolvers/_queries')
const mutations = require('./typedefs-resolvers/_mutation')
const enums = require('./typedefs-resolvers/_enums')
const members = require('./typedefs-resolvers/members')
const groups = require('./typedefs-resolvers/groups')
const roles = require('./typedefs-resolvers/role')

const typeDefs = [
    queries,
    mutations,
    enums,
    members.typeDefs,
    groups.typeDefs,
    roles.typeDefs,
]

const resolvers = [
    members.resolvers,
    groups.resolvers,
    roles.resolvers,
]

const server =  new ApolloServer({typeDefs, resolvers})

server.listen().then(({url}) => {
    console.log(`🚀  Server ready at ${url}`)
})
