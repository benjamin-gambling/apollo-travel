const trips = async (parent, args, context, info) => {
  const userId = context.user.id;
  const launches = await context.prisma.trip.findMany({
    where: { userId },
  });
  const launchIds =
    launches && launches.length
      ? launches.map((launch) => launch.launchId)
      : [];

  if (!launchIds.length) {
    return [];
  }

  return context.datasources.launchAPI.getLaunchesByIds({ launchIds });
};

module.exports = {
  trips,
};
