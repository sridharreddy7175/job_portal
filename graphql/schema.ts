const { buildSchema } = require("graphql");

module.exports = buildSchema(`
    type User{
        _id:ID!
        name:String!
        email:String!
        password:String!
    }
    input UserInputData{
        name:String!
        email:String!
        password:String!
    }
    type EditUser{
        name:String!
        password:String!
    }
    type RootQuery{
        getHello:String!
        getUsers:[User]
        getUser(id:ID!):User
    }
    type RootMutation{
        createUser(userInput:UserInputData):User!
        editUser(id: ID!,editUserInput:UserInputData):User!
        deleteUser(id:ID!):Boolean!
    }
    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);
