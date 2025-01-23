import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema({
    githubId: String,
    googleId: String,
    name: String,
    email: String,
    password: String,
    role: { type: String, default: 'user' },
});

export default mongoose.model('User', UserSchema);