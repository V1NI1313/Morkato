const { readJsonSync, writeJsonSync } = require('fs-extra')
const Habilitys = require('./habilitys')
const { inherits } = require('util')
const path = require('path')

class Guild {
  constructor(data) {
    this.data = data
    this.id = data.id
    this.cache = {}
  }
}
class ListedGuild {
  constructor(local, path) {
    this.__guilds = readJsonSync(local, {encoding: 'utf-8'}).map(guild => new Guild(guild))
    this.local = local
    this.path = path
  }
  getItem(index) {
    return this.__guilds[index]
  }
  /**@param {string} id @returns {Guild|null}*/
  get(id) {return this.__guilds .find(guild => guild.id === id) || null}
  /**@param {string} id */
  delete(id) {
    const index = this.__guilds .findIndex(guild => guild.id === id)
    if(index === -1) return null
    let removedGuild = this.__guilds[index]
    this.__guilds.splice(index, 1)
    this.reload()
    return removedGuild
  }
  /**@param {string} id */
  new(id) {
    const newGuild = new Guild({
      id: id,
      settings: {
        player: {
          breed: 0,
          life: [3000, 6000, 3000],
          stamina: [3000, 6000, 6000],
          rolls: [3, 3],
          nick: ["%n %yy|❤️%l|💨%s", "%n %yy|❤️%l|🩸%s", "%n %yy|❤️%l|💨%s"]
        },
        attack: {
          damege: [3000, 3000],
          stamina: [3000, 3000]
        }
      }
    })
    this.__guilds .push(newGuild)
    this.reload()
    return newGuild
  }
  reload() {
    writeJsonSync(this.local, this.__guilds.map(guild => guild.data), {spaces: 2, encoding: 'utf-8'})
  } 
  habilitys() {
    this.path
  }
}

module.exports = {
  guilds: new ListedGuild(path.normalize(path.join(__dirname, '../../private/Guilds.json')), path.normalize(path.join(__dirname, '../../private'))),
  Guild
}