// implement your posts router here
const express = require("express");
const router = express.Router();

const Post = require("./posts-model");
//Gets all posts in api
router.get("/", (req, res) => {
  Post.find()
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((err) => {
      console.log("Error Recieving Posts:", err);
      res.status(500).json({ message: err.message });
    });
});

router.get("/:id", (req, res) => {
  Post.findById(req.params.id)
    .then((posts) => {
      if (posts) {
        res.status(200).json(posts);
      } else {
        res.status(404).json({ message: "post not found in db" });
      }
    })
    .catch((err) => {
      console.log(err.message);
      res.status(500).json({ message: "error retrieving the post" });
    });
});

router.post("/", (req, res) => {
  Post.insert(req.body)
    .then((posts) => {
      res.status(201).json(posts);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "error adding new post" });
    });
});

router.put("/:id", (req, res) => {
  const changes = req.body;
  Post.update(req.params.id, changes)
    .then((posts) => {
      if (posts) {
        res.status(200).json(posts);
      } else if (!req.title || req.contents) {
        res.status(400).json({ message: "title and contents are required" });
      } else {
        res.status(404).json({ message: "Post not found in database" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Error Updating This Post!" });
    });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params.id;
  Post.remove(req.params.id)
    .then((post) => {
      if (!post) {
        res
          .status(404)
          .json({ message: `The post with id:(${id}) does not exist` });
      } else {
        res.status(201).json(post);
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Post" });
    });
});
module.exports = router;
