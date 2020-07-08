import { Schema as _Schema, model } from "mongoose";
const Schema = _Schema;

const urlSchema = new Schema({
    origin: String,
    code: String,
    url: String,
});

export default model("url", urlSchema);