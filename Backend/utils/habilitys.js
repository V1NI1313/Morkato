const { writeJsonSync } = require('fs-extra')
const { Guild } = require('./guilds')

class Hability {
  /** @param {Guild} guild */ constructor(guild, data) {
    this.data = data
    this.id = data['id']
  }
}

module.exports = class {
  /**@param {Hability[]} array; @param {Guild} guild */ constructor(guild, array) {
    this.__array = array
    this.guild = guild
  }
  /** @param {number} key */ getItem(key) {return this.__array[key];}
  /** @param {string} id */ get(id) {return this.__array.find(hability => hability.id === id) || null}
  /** @param {string} name; @param {number} require;@param {number} rarity; @returns {Hability} */ new(name, require, rarity) {
    const hability = new Hability(
      this.guild, {
        name: name,
        id: (Math.floor((Math.random() * Date.now()) * 10000)).toString(),
        roles: [],
        rarity: rarity,
        require: require,
        embed: {
          title: null,
          description: null,
          url: null
        }
      })
      this.__array.push(hability)
      this.reload()
      return hability
  }
  /** @returns {object} */ toJson() {return this.__array.map(hability => hability.data);}
  /** @returns {null} */ reload() {return writeJsonSync(`${this.guild.path}`, this.toJson(), { encoding: 'utf-8' }) || null}
}