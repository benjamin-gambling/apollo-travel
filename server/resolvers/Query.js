const { paginateResults } = require("../utils");

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

const launch = (parent, args, { datasources }, info) => {
  return datasources.launchAPI.getLaunchById({ launchId: args.id });
};

const me = (parent, args, context, info) => {
  //   context.resolvers.userAPI.findOrCreateUser()
  console.log(context, context.datasources);
};

module.exports = { launches, launch, me };
