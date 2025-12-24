import express from "express";
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let posts = [
  {
    id: 1,
    title: "Post 1",
    body: "Hello",
    comments: [{ id: 1, text: "Nice" }],
  },
  {
    id: 2,
    title: "Post 2",
    body: "Hello",
    comments: [{ id: 2, text: "Cool" }],
  },
];

app.get("/", (req, res) => {
  res.send("Hello!");
});

app.get("/posts", (req, res) => {
  res.json(posts);
});

app.get("/posts/:id/comments", (req, res) => {
  const post = posts.find((p) => p.id == req.params.id);
  if (!post) return res.status(404).json({ msg: "Post not found" });
  res.json(post.comments);
});

app.post("/posts", (req, res) => {
  const { title, body } = req.body;
  if (!title || !body) {
    return res.status(400).json({ msg: "Missing fields" });
  }
  const newPost = {
    id: posts.length + 1,
    title,
    body,
    comments: [],
  };
  posts.push(newPost);
  res.status(201).json(newPost);
});

app.post("/posts/:id/comments", (req, res) => {
  const post = posts.find((p) => p.id == req.params.id);
  if (!post) {
    return res.status(404).json({ msg: "Post not found" });
  }
  const { text } = req.body;
  if (!text) {
    return res.status(400).json({ msg: "Missing text" });
  }
  const newComment = {
    id: post.comments.length + 1,
    text,
  };
  post.comments.push(newComment);
  res.status(201).json(newComment);
});

app.listen(3000, () => console.log("Server running on port 3000"));
