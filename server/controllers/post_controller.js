import PostModel from "../models/post_model.js";
import mongoose from "mongoose";

// create new post
export const create_post = async (req, res) => {
  const new_post = new PostModel(req.body);

  try {
    await new_post.save();
    res.status(200).json("Post created");
  } catch (error) {
    res.status(500).json(error);
  }
};

// get a post
export const get_post = async (req, res) => {
  const id = req.params.id;

  try {
    const post = await PostModel.findById(id);

    res.status(200).json(post);
  } catch (error) {
    res.status(500).json(error);
  }
};

// update a post
export const update_post = async (req, res) => {
  const post_id = req.params.id;
  const { user_id } = req.body;

  try {
    const post = await PostModel.findById(post_id);
    // Users can only update their own posts
    if (post.user_id === user_id) {
      await post.updateOne({ $set: req.body });
      res.status(200).json("Post updated");
    } else {
      res.status(403).json("Action forbidden");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

// delete a post
export const delete_post = async (req, res) => {
  const id = req.params.id;
  const { user_id } = req.body;

  try {
    const post = await PostModel.findById(id);
    if (post.user_id === user_id) {
      await post.deleteOne();
      res.status(200).json("Post sucessfully deleted");
    } else {
      res.status(403).json("Action forbidden");
    }
  } catch (error) {}
};

// like and dislike a post
export const like_post = async (req, res) => {
  const id = req.params.id;
  const { user_id } = req.body;

  try {
    const post = await PostModel.findById(id);
    // if the user didn't like the post already
    if (!post.likes.includes(user_id)) {
      await post.updateOne({ $push: { likes: user_id } });
      res.status(200).json("Post liked");
    } else {
      await post.updateOne({ $pull: { likes: user_id } });
      res.status(200).json("Post unliked");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
