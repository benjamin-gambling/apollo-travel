const trips = async (parent, args, context, info) => {
  const userId = context.user.id;
  const launches = await context.prisma.trip.findMany({
    where: { userId },
  });
  const launchIds =
    launches && launches.length
      ? launches.map((launch) => launch.launchId)
      : [];

  console.log(launchIds);
  //   Elimtates the none true values
  console.log(launchIds.filter((ea) => !!ea));

  if (!launchIds.length) {
    return [];
  }

  return context.datasources.launchAPI.getLaunchByIds({ launchIds });
};

module.exports = {
  trips,
};
