import mongoose from "mongoose";

const BooksSchema = new mongoose.Schema({
   username: { type: String, required: true },
   title: { type: String, required: true },
   author: { type: String, required: true },
   rate: { type: Number, required: true },
   photo_dir: { type: String, required: true },
});

export default mongoose.model("Book", BooksSchema);
