const { readFileSync, writeFileSync, readdirSync } = require('fs')
const { Guild, guilds } = require('./guilds')
const { fixData } = require('./other')
const path = require('path')


module.exports.Guild = Guild
module.exports.guilds = guilds
module.exports.fixData = fixData