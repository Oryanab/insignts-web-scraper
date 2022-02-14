import mongoose, { Schema } from "mongoose";
import { PasteDb } from "../types/pasteTypes";

const pastesSchema: mongoose.Schema = new Schema<PasteDb>({
  title: { type: String, required: true, unique: true },
  content: { type: String, required: true, unique: true },
  author: { type: String, required: true, unique: true },
  date: { type: String, required: true, unique: true },
  sentiment: { type: String, required: true, unique: true },
  paste_entire_content: { type: String, required: true, unique: true },
});

const Paste = mongoose.model("paste", pastesSchema);

export default Paste;
