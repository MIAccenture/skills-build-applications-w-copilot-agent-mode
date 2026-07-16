"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Team = void 0;
const mongoose_1 = require("mongoose");
const teamSchema = new mongoose_1.Schema({
    name: { type: String, required: true, unique: true },
    members: { type: Number, required: true },
    goal: { type: String, required: true },
    sport: { type: String }
}, {
    timestamps: true
});
exports.Team = (0, mongoose_1.model)('Team', teamSchema);
