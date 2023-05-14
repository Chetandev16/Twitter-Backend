import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4'
import bodyParser from 'body-parser';
import { prisma } from '../clients/db';

export async function initServer() {
    const app = express();
    app.use(bodyParser.json()) 

    
    const graphqlServer = new ApolloServer({
        typeDefs: `
            type Query {
                hello: String
                sayHelloToMe(name: String!): String
            }

            type Mutation {
                addMessage(message: String!): String
            }
        `,
        resolvers: {
            Query: {
                hello: () => 'Hello world!',
                sayHelloToMe: (parent: any, {name}:{name:string}) => `Hello ${name}`
            },
            Mutation: {}
        }
    });

    await graphqlServer.start();
    app.use('/graphql', expressMiddleware(graphqlServer));


    return app
}