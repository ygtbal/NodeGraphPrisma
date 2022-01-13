const {gql} = require('apollo-server');

const typeDefs = gql`
    type Profile {
        id: ID!
        studentId: Int
        name: String!
    }
    
    type Student {
        id: ID!
        email: String!
        fullName: String!
        dept: String
        enrolled: Boolean
        profile: Profile
    }

    type Query {
       enrollment: [Student!]
       students: [Student!]!
       profiles: [Profile!]
       student(id: ID!): Student
    }

    input ProfileContent {
        name: String!
    }

    input createUserContent {
        email: String!,
        fullName: String!,
        dept: String,
        profile: ProfileContent
    }

    type Mutation {
        registerStudent(content: createUserContent): Student!
        enroll(id: ID!): Student
    }
`;

module.exports = {
    typeDefs
}