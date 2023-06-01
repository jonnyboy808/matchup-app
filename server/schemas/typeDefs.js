const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Matchup {
    _id: ID
    tech1: String
    tech2: String
    tech1_votes: Number
    tech2_votes: Number
  }

  type Tech {
    _id: ID
    name: String
  }

  type Query {
    matchups: [Matchup]
    matchup(_id: ID!): Matchup
    tech: [Tech]
  }

  type Mutation {
    createMatchup(tech1: String!, tech2: String!): Matchup
    createVote1(matchupId: ID!, whichTech: Number!): Matchup
  }
`;

module.exports = typeDefs;
