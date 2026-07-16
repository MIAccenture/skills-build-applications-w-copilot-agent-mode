"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Workout = void 0;
const mongoose_1 = require("mongoose");
const workoutSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    duration: { type: String, required: true },
    difficulty: { type: String, required: true },
    focus: { type: String }
}, {
    timestamps: true
});
exports.Workout = (0, mongoose_1.model)('Workout', workoutSchema);
