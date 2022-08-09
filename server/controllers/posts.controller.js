const Post = require("../models/posts.model");

exports.postPost = async (req, res) => {
  try {
    const post = await new Post(req.body).save();
    const posts = await Post.find();
    res.status(200).json({
      Message: "Post was inserted successfully!",
      posts: posts,
    });
  } catch (err) {
    res.status(500).json({
      Message: "There was a server side error!",
      Error: err,
    });
  }
};

exports.getPosts = async (req, res) => {
  try {
    const post = await Post.find();
    res.status(200).json({
      Message: "Posts were fetched successfully!",
      Posts: post,
    });
  } catch (err) {
    res.status(500).json({
      Message: "There was a server side error!",
      Error: err,
    });
  }
};

exports.getPost = async (req, res) => {
  try {
    const post = await Post.findOne({ _id: req.params.id });
    res.status(200).json({
      Message: "Post was fetched successfully!",
      Post: post,
    });
  } catch (err) {
    res.status(500).json({
      Message: "There was a server side error!",
      Error: err,
    });
  }
};

exports.updatePost = async (req, res) => {
  try {
    const post = await Post.findOneAndUpdate({ _id: req.params.id }, req.body);
    const posts = await Post.find();
    const updatedPost = await Post.findOne({ _id: req.params.id });
    res.status(200).json({
      Message: "Post was updated successfully!",
      posts: posts,
      UpdatedPost: updatedPost,
    });
  } catch (err) {
    res.status(500).json({
      Message: "There was a server side error!",
      Error: err,
    });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    const posts = await Post.find();
    res.status(200).json({
      Message: "Posts was deleted successfully!",
      posts: posts,
    });
  } catch (err) {
    res.status(500).json({
      Message: "There was a server side error!",
      Error: err,
    });
  }
};
