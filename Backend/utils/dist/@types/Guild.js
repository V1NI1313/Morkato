"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.schema = void 0;
const joi_1 = __importDefault(require("joi"));
const defaultPlayerSettings = {
    breed: 0,
    life: [3000, 6000, 3000],
    stamina: [3000, 6000, 6000],
    rolls: [3, 3],
    nick: ["%n %yy | %l | %s", "%n %yy | %l | %s", "%n %yy | %l | %s"]
};
const SchemaPlayerSettings = joi_1.default.object({
    breed: joi_1.default.number().integer().valid(0, 1).default(0),
    life: joi_1.default.array().length(3).items(joi_1.default.number().min(1).max(999999999).integer()).default([3000, 6000, 3000]),
    stamina: joi_1.default.array().length(3).items(joi_1.default.number().min(1).max(999999999).integer()).default([3000, 6000, 6000]),
    rolls: joi_1.default.array().length(2).items(joi_1.default.number().min(1).max(99).integer()).default([3, 3]),
    nick: ["%n %yy | %l | %s", "%n %yy | %l | %s", "%n %yy | %l | %s"]
}).default(defaultPlayerSettings);
const SchemaSettings = joi_1.default.object({
    player: SchemaPlayerSettings
}).default({
    player: SchemaPlayerSettings
});
const SchemaGuild = joi_1.default.object({
    id: joi_1.default.string().strip().regex(/([0-9]+)/).required(),
    settings: SchemaSettings
});
exports.schema = {
    PlayerSettings: SchemaPlayerSettings,
    Settings: SchemaSettings,
    Guild: SchemaGuild
};
