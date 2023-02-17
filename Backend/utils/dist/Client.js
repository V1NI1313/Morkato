"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Client = void 0;
const fs_1 = require("fs");
const Guild_1 = require("./Guild");
class Payload {
    constructor(settings) {
        this.settings = settings;
        const json = (0, fs_1.readFileSync)('.' + settings.api.guilds.arq, { encoding: 'utf-8' }).toString();
        this.guilds = new Guild_1.Guilds(JSON.parse(json));
    }
    async verify(v) {
        return (await fetch(`${this.settings.url}${v}`, {
            headers: { authorization: `Bot ${this.settings.token}` }
        })).status == 200;
    }
    async get(v) {
        return await (await fetch(`${this.settings.url}${v}`, {
            headers: { authorization: `Bot ${this.settings.token}` }
        })).json();
    }
}
class Client extends Payload {
    async getGuild(id) {
        if (await this.verify(`/guilds/${id}`)) {
            return this.guilds.get(id);
        }
        return null;
    }
    async getGuildIndex(id) {
        if (await this.verify(`/guilds/${id}`)) {
            return this.guilds.getIndex(id);
        }
        return null;
    }
    async newGuild(id) {
        const guild = this.guilds.new({ id: id });
        if (!guild) {
            return guild;
        }
        this.guilds.add(guild);
        const json = JSON.stringify(this.guilds.v);
        (0, fs_1.writeFileSync)('.' + this.settings.api.guilds.arq, json, { encoding: 'utf-8' });
        return guild;
    }
    async editGuild(g, e) {
        const guild = Guild_1.utils.editGuild(g, e);
        if (!guild) {
            return guild;
        }
        const index = this.guilds.getIndex(g.id);
        if (!index) {
            return undefined;
        }
        this.guilds.setItem(index, guild);
        const json = JSON.stringify(this.guilds.v);
        (0, fs_1.writeFileSync)('.' + this.settings.api.guilds.arq, json, { encoding: 'utf-8' });
        return guild;
    }
}
exports.Client = Client;
