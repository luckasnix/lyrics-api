const fs = require('fs')
const path = require('path')

const songsPath = path.join(path.dirname(process.mainModule.filename), 'database', 'songs.json')
const lyricsPath = path.join(path.dirname(process.mainModule.filename), 'database', 'lyrics.json')

function getSongsFromFile() {
  return JSON.parse(fs.readFileSync(songsPath))
}

function getLyricsFromFile() {
  return JSON.parse(fs.readFileSync(lyricsPath))
}

module.exports = { songsPath, lyricsPath, getSongsFromFile, getLyricsFromFile }