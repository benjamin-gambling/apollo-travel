const { paginateResults } = require("../utils");
const isEmail = require("isemail");

const launches = async (
  parent,
  { pageSize = 20, after },
  { datasources },
  info
) => {
  const allLaunches = await datasources.launchAPI.getAllLaunches();
  allLaunches.reverse();

  const launches = paginateResults({
    after,
    pageSize,
    results: allLaunches,
  });

  return {
    launches,
    cursor: launches.length ? launches[launches.length - 1].cursor : null,
    hasMore: launches.length
      ? launches[launches.length - 1].cursor !==
        allLaunches[allLaunches.length - 1].cursor
      : false,
  };
};

const launch = async (parent, args, { datasources }, info) => {
  return await datasources.launchAPI.getLaunchById({ launchId: args.id });
};

const me = async (parent, args, context, info) => {
  if (!context.user) return null;
  const email = context.user.email;
  if (!email || !isEmail.validate(email)) return null;

  const user = await context.prisma.user.upsert({
    where: { email },
    update: {},
    create: {
      email,
      token: Buffer.from(email).toString("base64"),
    },
  });

  return user;
};

module.exports = { launches, launch, me };
