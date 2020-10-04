const { ApolloServer, gql } = require("apollo-server");
const { PrismaClient } = require("@prisma/client");
const { importSchema } = require("graphql-import");

const isEmail = require("isemail");

const Query = require("./resolvers/Query");
const Mission = require("./resolvers/Mission");
const User = require("./resolvers/User");
const Launch = require("./resolvers/Launch");
const Mutation = require("./resolvers/Mutation");

const LaunchAPI = require("./datasources/launch");

const importedTypeDefs = importSchema(__dirname + "/schema.graphql");
const typeDefs = gql`
  ${importedTypeDefs}
`;

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

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = (req.headers && req.headers.authorization) || "";
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
      req,
      datasources,
      prisma,
      user,
    };
  },
});

server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(`🚀 app running at ${url}`);
});
