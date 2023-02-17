"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.utils = exports.Guilds = void 0;
const Guild_1 = require("./@types/Guild");
const joi_1 = __importDefault(require("joi"));
class Payload {
    constructor(v) { this.v = v; }
    getItem(k) {
        var _a;
        return (_a = this.v[k]) !== null && _a !== void 0 ? _a : null;
    }
    setItem(k, v) {
        this.v[k] = v;
    }
    add(g) {
        return this.v.push(g);
    }
}
class Guilds extends Payload {
    get(id) {
        var _a;
        return (_a = this.v.find(guild => guild.id === id)) !== null && _a !== void 0 ? _a : null;
    }
    getIndex(id) {
        var _a;
        return (_a = this.v.findIndex(guild => guild.id === id)) !== null && _a !== void 0 ? _a : null;
    }
    new(guild) {
        if (!this.v.find(g => g.id == guild.id)) {
            return undefined;
        }
        return exports.utils.schema.validate(guild).value;
    }
}
exports.Guilds = Guilds;
exports.utils = {
    schema: Guild_1.schema.Guild,
    getSchema(guild) {
        return joi_1.default.object({
            id: guild.id,
            settings: joi_1.default.object({
                player: joi_1.default.object({
                    breed: joi_1.default.number().integer().valid(0, 1).default(guild.settings.player.breed),
                    life: joi_1.default.array().length(3).items(joi_1.default.number().integer().min(1).max(999999999)).default(guild.settings.player.life),
                    stamina: joi_1.default.array().length(3).items(joi_1.default.number().integer().min(1).max(999999999)).default(guild.settings.player.stamina),
                    rolls: joi_1.default.array().length(2).items(joi_1.default.number().integer().min(1).max(999)).default(guild.settings.player.rolls),
                    nick: joi_1.default.array().length(3).items(joi_1.default.string().strip().min(1)).default(guild.settings.player.nick)
                }).default(guild.settings.player)
            }).default(guild.settings)
        });
    },
    editGuild(guild, editable) {
        return this.getSchema(guild).validate(editable).value;
    }
};
