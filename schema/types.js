const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLInt, GraphQLList } = require('graphql')
const { getSongsFromFile, getLyricsFromFile } = require('./connection')

const Song = new GraphQLObjectType({
  name: 'Song',
  fields: () => {
    return {
      id: {
        type: GraphQLID
      },
      title: {
        type: GraphQLString
      },
      lyrics: {
        type: new GraphQLList(Lyric),
        resolve(par) {
          return getLyricsFromFile().filter((lyric) => {
            return lyric.songId === par.id
          })
        }
      }
    }
  }
})

const Lyric = new GraphQLObjectType({
  name: 'Lyric',
  fields: () => {
    return {
      id: {
        type: GraphQLID
      },
      content: {
        type: GraphQLString
      },
      likes: {
        type: GraphQLInt
      },
      song: {
        type: Song,
        resolve(par) {
          return getSongsFromFile().find((song) => {
            return song.id === par.songId
          })
        }
      }
    }
  }
})

module.exports = { Song, Lyric }