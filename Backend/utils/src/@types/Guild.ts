import Joi from 'joi'

export interface PlayerSettings {
  breed: number,
  life: number[],
  stamina: number[],
  rolls: number[],
  nick: string[]
}

const defaultPlayerSettings: PlayerSettings = {
  breed: 0,
  life: [ 3000, 6000, 3000 ],
  stamina: [ 3000, 6000, 6000 ],
  rolls: [ 3, 3 ],
  nick: [ "%n %yy | %l | %s", "%n %yy | %l | %s", "%n %yy | %l | %s" ]
}
const SchemaPlayerSettings: Joi.ObjectSchema<PlayerSettings> = Joi.object<PlayerSettings>({
  breed: Joi.number().integer().valid(0, 1).default(0),
  life: Joi.array().length(3).items(Joi.number().min(1).max(999999999).integer()).default([ 3000, 6000, 3000 ]),
  stamina: Joi.array().length(3).items(Joi.number().min(1).max(999999999).integer()).default([ 3000, 6000, 6000 ]),
  rolls: Joi.array().length(2).items(Joi.number().min(1).max(99).integer()).default([ 3, 3 ]),
  nick: [ "%n %yy | %l | %s", "%n %yy | %l | %s", "%n %yy | %l | %s" ]
}).default(defaultPlayerSettings)

export interface Settings {
  player: PlayerSettings
}

const SchemaSettings: Joi.ObjectSchema<Settings> = Joi.object<Settings>({
  player: SchemaPlayerSettings
}).default({
  player: SchemaPlayerSettings
})

export interface Guild {
  id: string,
  settings: Settings
}

const SchemaGuild: Joi.ObjectSchema<Guild> = Joi.object<Guild>({
  id: Joi.string().strip().regex(/([0-9]+)/).required(),
  settings: SchemaSettings
})

interface Schemas {
  PlayerSettings: Joi.ObjectSchema<PlayerSettings>,
  Settings: Joi.ObjectSchema<Settings>,
  Guild: Joi.ObjectSchema<Guild>
}

export const schema: Schemas = {
  PlayerSettings: SchemaPlayerSettings,
  Settings: SchemaSettings,
  Guild: SchemaGuild
}