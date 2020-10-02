const missionPatch = (mission, { size } = { size: "LARGE" }, context, info) => {
  return size === "SMALL"
    ? mission.missionPatchSmall
    : mission.missionPatchLarge;
};

module.exports = { missionPatch };
