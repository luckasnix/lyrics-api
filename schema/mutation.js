const fs = require('fs')
const { v4 } = require('uuid')
const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLNonNull } = require('graphql')
const { songsPath, lyricsPath, getSongsFromFile, getLyricsFromFile } = require('./connection')
const { Song, Lyric } = require('./types')

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addSong: {
      type: Song,
      args: {
        title: {
          type: new GraphQLNonNull(GraphQLString)
        }
      },
      resolve(_, args) {
        const songToAdd = {
          id: v4(),
          title: args.title
        }
        const songs = getSongsFromFile()
        const songsUpdated = songs.concat(songToAdd)
        fs.writeFileSync(songsPath, JSON.stringify(songsUpdated))
        return songToAdd
      }
    },
    deleteSong: {
      type: Song,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLID)
        }
      },
      resolve(_, args) {
        const songs = getSongsFromFile()
        const songToDelete = songs.find((song) => {
          return song.id === args.id
        })
        const songsUpdated = songs.filter((song) => {
          return song.id !== args.id
        })
        fs.writeFileSync(songsPath, JSON.stringify(songsUpdated))
        const lyrics = getLyricsFromFile()
        const lyricsUpdated = lyrics.filter((lyric) => {
          return lyric.songId !== args.id
        })
        fs.writeFileSync(lyricsPath, JSON.stringify(lyricsUpdated))
        return songToDelete
      }
    },
    addLyricToSong: {
      type: Song,
      args: {
        content: {
          type: new GraphQLNonNull(GraphQLString)
        },
        songId: {
          type: new GraphQLNonNull(GraphQLID)
        }
      },
      resolve(_, args) {
        const lyricToAdd = {
          id: v4(),
          content: args.content,
          likes: 0,
          songId: args.songId
        }
        const lyrics = getLyricsFromFile()
        const lyricsUpdated = lyrics.concat(lyricToAdd)
        fs.writeFileSync(lyricsPath, JSON.stringify(lyricsUpdated))
        const songs = getSongsFromFile()
        const currentSong = songs.find((song) => {
          return song.id === args.songId
        })
        return currentSong
      }
    },
    likeLyric: {
      type: Lyric,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLID)
        }
      },
      resolve(_, args) {
        const lyrics = getLyricsFromFile()
        let lyricToLike = lyrics.find((lyric) => {
          return lyric.id === args.id
        })
        lyricToLike.likes++
        const lyricsUpdated = lyrics.map((lyric) => {
          if(lyric.id === args.id) {
            return lyricToLike
          } else {
            return lyric
          }
        })
        fs.writeFileSync(lyricsPath, JSON.stringify(lyricsUpdated))
        return lyricToLike
      }
    }
  }
})

module.exports = Mutation