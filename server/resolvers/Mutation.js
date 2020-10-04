const isEmail = require("isemail");

const login = async (parent, { email: emailArgs }, context, info) => {
  const email = context.user ? context.user.email : emailArgs;
  if (!email || !isEmail.validate(email)) return null;

  const user = await context.prisma.user.upsert({
    where: { email },
    update: {},
    create: {
      email,
      token: Buffer.from(email).toString("base64"),
    },
  });

  if (user) return user.token;
};

const bookTrips = async (parent, { launchIds }, context, info) => {
  const userId = await context.user.id;
  if (!userId) return;

  const results = [];

  const bookTrip = async (launchId) => {
    const res = await context.prisma.trip.upsert({
      where: {
        launchId_userId: {
          launchId,
          userId,
        },
      },
      update: {},
      create: {
        launchId,
        User: { connect: { id: userId } },
      },
    });

    return res !== null ? res : false;
  };

  for (const launchId of launchIds) {
    const res = await bookTrip(+launchId);

    if (res) results.push(res);
  }

  const launches = await context.datasources.launchAPI.getLaunchesByIds({
    launchIds,
  });

  return {
    success: results && results.length === launchIds.length,
    message:
      results.length === launchIds.length
        ? "Success! You're going to Space!"
        : `Houston, we have a probelm! The following launches couldn't be booked: ${launchIds.filter(
            (id) => !results.includes(id)
          )}`,
    launches,
  };
};

const cancelTrip = async (parent, { launchId }, context, info) => {
  const userId = await context.user.id;

  const result = await context.prisma.trip.delete({
    where: {
      launchId_userId: {
        launchId: Number(launchId),
        userId,
      },
    },
  });

  if (!result)
    return {
      success: false,
      message: "Houston, we have a problem! We failed to cancel the trip",
    };

  const launch = await context.datasources.launchAPI.getLaunchById({
    launchId,
  });

  return {
    success: true,
    message: "Trip cancelled!",
    launches: [launch],
  };
};

module.exports = {
  bookTrips,
  cancelTrip,
  login,
};
