const { Matchup, Tech } = require("../models");

const resolvers = {
  Query: {
    matchups: async () => {
      const allMatchups = await Matchup.find({});

      if (!allMatchups) {
        return "No matchups found";
      }

      return allMatchups;
    },
    matchup: async (parent, { id }) => {
      const matchup = await Matchup.findOne({ _id: id });

      if (!matchup) {
        return "No matchup found by that id";
      }

      return matchup;
    },
    tech: async () => {
      return Tech.find();
    },
  },

  Mutation: {
    createMatchup: async (parent, { tech1, tech2 }) => {
      const matchup = await Matchup.create({ tech1, tech2 });
      return matchup;
    },
    createVote: async (parent, { matchupId, whichTech }) => {
      const vote = await Matchup.findOneAndUpdate(
        { _id: matchupId },
        { $inc: { [`tech${whichTech}_votes`]: 1 } },
        { new: true }
      );

      if (!vote) {
        return "Unable to vote on matchup";
      }

      return vote;
    },
  },
};

module.exports = resolvers;
