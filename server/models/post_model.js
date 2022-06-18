import mongoose from "mongoose";

const post_schema = mongoose.Schema({
  user_id: { type: String, required: true },
  desc: String,
  likes: [],
  image: String,
}, {
    timestamps: true
});

const PostModel = mongoose.model("Posts", post_schema)
export default PostModel