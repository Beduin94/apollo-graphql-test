const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        id: ID!
        name: String
        email: String
    }
    type Query {
        user(id: ID!): User!
        users(skip: Int = 0, limit: Int = 10): [User]
        countPagination: Int
    }
    type Mutation {
        createUser(input: CreateUserInput!): User!
        updateUser(id: ID!, input: UpdateUserInput!): User!
        deleteUser(id: ID!): User!
    }
    input CreateUserInput {
        email: String!
        name: String!
    }
    input UpdateUserInput {
        email: String
        name: String
    }
`;

module.exports = typeDefs;