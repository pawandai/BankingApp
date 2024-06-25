"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const userType = `#graphql
    type User {
        _id: ID!
        username: String!
        name: String!
        password: String!
        profilePicture: String
        gender: String
    }

    type Query {
        authUser: User
        user(userId: ID!): User
    }

    input SignUpInput {
        username: String!
        name: String!
        password: String!
        gender: String!
    }

    input LogInInput {
        username: String!
        password: String!
    }

    type LogOutResponse {
        message: String!
    }

    type Mutation {
        signUp(input: SignUpInput!): User
        logIn(input: LogInInput!): User
        logOut: LogOutResponse
    }
`;
exports.default = userType;
