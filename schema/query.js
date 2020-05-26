const { GraphQLObjectType, GraphQLID, GraphQLList, GraphQLNonNull } = require('graphql')
const { Song, Lyric } = require('./types')
const { getSongsFromFile, getLyricsFromFile } = require('./connection')

const Query = new GraphQLObjectType({
  name: 'Query',
  fields: {
    song: {
      type: Song,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLID)
        }
      },
      resolve(_, args) {
        const songs = getSongsFromFile()
        const curSong = songs.find((song) => {
          return song.id === args.id
        })
        return curSong
      }
    },
    lyric: {
      type: Lyric,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLID)
        }
      },
      resolve(_, args) {
        const lyrics = getLyricsFromFile()
        const curLyric = lyrics.find((lyric) => {
          return lyric.id === args.id
        })
        return curLyric
      }
    },
    songs: {
      type: new GraphQLList(Song),
      resolve() {
        const songs = getSongsFromFile()
        return songs
      }
    },
    lyrics: {
      type: new GraphQLList(Lyric),
      resolve() {
        const lyrics = getLyricsFromFile()
        return lyrics
      }
    }
  }
})

module.exports = Query