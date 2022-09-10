const {gql} = require('apollo-server')

const typeDefs = gql`
    enum Sex {
        male
        female
    }
    
    enum RoleType {
        leader
        main_vocal
        sub_vocal
        vocal
        main_dancer
        sub_dancer
        dancer
        main_rapper
        sub_rapper
        rapper
        center
    }
`;

module.exports = typeDefs;
