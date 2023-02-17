import { Guild as EditableGuild } from './@types/@editable/Guild'
import { Settings } from './@types/Settings'
import { Guild } from './@types/Guild'

import  { readFileSync, writeFileSync } from 'fs'
import { Guilds, utils } from './Guild'

class Payload {
  public settings: Settings;
  public guilds: Guilds;
  constructor(settings: Settings) {
    this.settings = settings
    const json = readFileSync('.'+settings.api.guilds.arq, { encoding: 'utf-8' }).toString()
    this.guilds = new Guilds(JSON.parse(json))
  }
  async verify(v: string): Promise<boolean> {
    return (await fetch(`${this.settings.url}${v}`, {
      headers: { authorization: `Bot ${this.settings.token}` }
    })).status == 200
  }
  async get(v: string): Promise<any> {
    return await (await fetch(`${this.settings.url}${v}`, {
      headers: { authorization: `Bot ${this.settings.token}` }
    })).json()
  }
}

export class Client extends Payload {
  async getGuild(id: string): Promise<Guild | null> {
    if (await this.verify(`/guilds/${id}`))
      { return this.guilds.get(id); }
    return null;
  }
  async getGuildIndex(id: string): Promise<number | null> {
    if (await this.verify(`/guilds/${id}`))
      { return this.guilds.getIndex(id); }
    return null;
  }
  async newGuild(id: string): Promise<Guild | undefined> {
    const guild = this.guilds.new({ id: id })
    if(!guild)
      { return guild; }
    this.guilds.add(guild)
    const json = JSON.stringify(this.guilds.v)
    writeFileSync('.'+this.settings.api.guilds.arq, json, { encoding: 'utf-8' })

    return guild;
  }
  async editGuild(g: Guild, e: EditableGuild): Promise<Guild | undefined> {
    const guild = utils.editGuild(g, e);
    if(!guild)
      { return guild; }
    const index = this.guilds.getIndex(g.id)
    if(!index)
      { return undefined }
    this.guilds.setItem(index, guild)
    const json = JSON.stringify(this.guilds.v)
    writeFileSync('.'+this.settings.api.guilds.arq, json, { encoding: 'utf-8' })

    return guild
  }
}
