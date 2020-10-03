const { GraphQLServer } = require("graphql-yoga");
const { PrismaClient } = require("@prisma/client");

const isEmail = require("isemail");

const Query = require("./resolvers/Query");
const Mission = require("./resolvers/Mission");
const User = require("./resolvers/User");
const Launch = require("./resolvers/Launch");
const Mutation = require("./resolvers/Mutation");

const LaunchAPI = require("./datasources/launch");

require("dotenv").config();

const datasources = {
  launchAPI: new LaunchAPI(),
};

const resolvers = {
  Query,
  Mission,
  User,
  Launch,
  Mutation,
};

const prisma = new PrismaClient();

const server = new GraphQLServer({
  typeDefs: "./server/schema.graphql",
  resolvers,
  context: async ({ request }) => {
    const auth = (request.headers && request.headers.authorization) || "";
    const email = Buffer.from(auth, "base64").toString("ascii");

    let user;

    isEmail.validate(email)
      ? (user = await prisma.user.upsert({
          where: { email },
          update: {},
          create: {
            email,
            token: Buffer.from(email).toString("base64"),
          },
        }))
      : (user = null);

    return {
      request,
      datasources,
      prisma,
      user,
    };
  },
});

const options = {
  port: process.env.PORT || 4000,
  tracing: "enabled",
  // endpoint: '/graphql',
  // subscriptions: '/subscriptions',
  // playground: '/playground',
};

server.start(options, ({ port }) =>
  console.log(`Server started on port ${port}`)
);
