const { readJSON, writeJSON, access, constants} = require('fs-extra')
const Joi = require('joi')

module.exports.exists = /**@param {string} path; @returns {Promise<boolean>}*/(path) => new Promise((resolve, reject) => access(path, constants.F_OK, err => {
  if(!err) {
    return resolve(true)
  } else {
    return resolve(false)
  }
}))
const exists = module.exports.exists
module.exports.newGuld = /**@param {string} id @returns {Promise<any>}*/ (id) => new Promise((resolve, reject) => resolve({
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
} ))
module.exports.habilitys = {
  getHability:/**@param {string} id; @param {string} local @returns {Promise<any[]>}*/ async (local, id) => {
    const locale = `${local}/${id}.json`
    if (await exists(locale)) {
      return await readJSON(locale, { encoding: 'utf-8' })
    } else {
      await writeJSON(locale, [], { encoding: 'utf-8' })
      return []
    }
  },
  newHability: /** @param {string} name @param {string} role @param {number} rarity @param {number} require*/
  (name, role, rarity=null, require=null) => new Promise((resolve, reject) => {
    return resolve({
      name: name,
      id: (Math.floor(Date.now() * Math.random() * 1000)).toString(),
      role: role,
      roles: [],
      rarity: rarity || 0,
      require: require || 1,
      embed: {
        title: null,
        description: null,
        url: null
      }
    })
  }),
  shema: Joi.object({
    name: Joi.string().min(3).max(40).required(),
    role: Joi.string().required(),
    rarity: Joi.number().required(),
    require: Joi.number().required()
  })
}