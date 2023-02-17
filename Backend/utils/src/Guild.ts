import { Guild as EditableGuild } from './@types/@editable/Guild'
import { Guild, schema as schemas } from './@types/Guild'
import Joi from 'joi'

class Payload {
  public v: Guild[];
  constructor(v: Guild[]) { this.v = v }
  getItem(k: number): Guild | null {
    return this.v[k] ?? null;
  }
  setItem(k: number, v: Guild): void {
    this.v[k] = v
  }
  add(g: Guild): number {
    return this.v.push(g);
  }
}

export class Guilds extends Payload {
  get(id: string): Guild | null {
    return this.v.find(guild => guild.id === id) ?? null
  }
  getIndex(id: string): number | null {
    return this.v.findIndex(guild => guild.id === id) ?? null
  }
  new(guild: EditableGuild): Guild | undefined {
    if(!this.v.find(g => g.id == guild.id))
      { return undefined; }
    return utils.schema.validate(guild).value
  }
}

interface utilsGuild {
  schema: Joi.ObjectSchema<Guild>,
  getSchema(guild: Guild): Joi.ObjectSchema<Guild>,
  editGuild(guild: Guild, editable: EditableGuild): Guild | undefined
}

export const utils: utilsGuild = {
  schema: schemas.Guild,
  getSchema(guild: Guild) {
    return Joi.object({
      id: guild.id,
      settings: Joi.object({
        player: Joi.object({
          breed: Joi.number().integer().valid(0, 1).default(guild.settings.player.breed),
          life: Joi.array().length(3).items(Joi.number().integer().min(1).max(999999999)).default(guild.settings.player.life),
          stamina: Joi.array().length(3).items(Joi.number().integer().min(1).max(999999999)).default(guild.settings.player.stamina),
          rolls: Joi.array().length(2).items(Joi.number().integer().min(1).max(999)).default(guild.settings.player.rolls),
          nick: Joi.array().length(3).items(Joi.string().strip().min(1)).default(guild.settings.player.nick)
        }).default(guild.settings.player)
      }).default(guild.settings)
    });
  },
  editGuild(guild: Guild, editable: EditableGuild): Guild | undefined {
    return this.getSchema(guild).validate(editable).value
  }
}
