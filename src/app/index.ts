import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4'
import bodyParser from 'body-parser';



export async function initServer() {
    const app = express();

    app.use(express.json())
    app.use(bodyParser.json())

    const graphqlServer = new ApolloServer({
        typeDefs: `
            type Query {
                hello: String
            }

            type Mutation {
                addMessage(message: String!): String
            }
        `,
        resolvers: {
            Query: {},
            Mutation: {}
        }
    });

    await graphqlServer.start();
    app.use('/graphql', expressMiddleware(graphqlServer));


    return app
}