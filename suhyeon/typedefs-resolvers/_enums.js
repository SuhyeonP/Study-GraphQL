const { gql } = require('apollo-server')

const typeDefs = gql`
    enum Sex {
        male
        female
    }
`;

module.exports = typeDefs;
