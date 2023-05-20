import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4'
import bodyParser from 'body-parser';
import cors from 'cors';
import { user } from "./user"
import { GraphqlContext } from '../interfaces';
import JWTService from '../services/jwt';

export async function initServer() {
    const app = express();
    app.use(bodyParser.json())

    app.use(cors({
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE"]
    }));

    const graphqlServer = new ApolloServer<GraphqlContext>({
        typeDefs: `
            ${user.types}
            type Query {
                ${user.queries}
            }

            type Mutation {
                addMessage(message: String!): String
            }
        `,
        resolvers: {
            Query: {
                ...user.resolvers.queries,
            },
            Mutation: {}
        }
    });

    await graphqlServer.start();
    app.use('/graphql', expressMiddleware(graphqlServer, {
        context: async({req,res}) => {
            return {
                user: req.headers.authorization ? JWTService.decodeToken(req.headers.authorization.split(' ')[1]) : undefined
            }
        }
    }));


    return app
}