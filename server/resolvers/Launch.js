const isBooked = async (launch, args, context, info) => {
  // user logged in??
  if (!context.user) {
    console.log("context user returned false ");
    return false;
  }

  const launchId = launch.id;
  const userId = context.user.id;
  const found = await context.prisma.trip.findOne({
    where: {
      launchId_userId: {
        launchId,
        userId,
      },
    },
  });

  return found ? true : false;
};

module.exports = {
  isBooked,
};
