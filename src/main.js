import express from "express";
import path from "node:path";
import { Blog } from "./model/blog.model.js";
import { connectDB } from "./src/config/db.js";

const app = express();


// set the view engine to ejs
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", path.join(import.meta.dirname, "views"));

// use res.render to load up an ejs view file

app.get("/", function (req, res) {
  res.render("pages/index");
});

app.get("/blog", async function (req, res) {
  const blogs = await Blog.find({});
  res.render("pages/blog", { blogs });
});

app.get("/blog/new", async function (req, res) {
  res.render("pages/new");
});

app.get("/blog/edit/:id", async function (req, res) {
  const { id } = req.params;
  const blog = await Blog.findById(id);
  res.render("pages/blog_edit", { blog });
});

app.get("/blog/:id", async function (req, res) {
  const { id } = req.params;
  const blog = await Blog.findById(id);
  res.render("pages/blog_one", { blog });
});

app.post("/blog", async function (req, res) {
  const body = req.body;
  const newPost = await Blog.create(body);
  console.log(newPost);
  res.redirect("/blog");
});

app.post("/blog/:id", async function (req, res) {
  const body = req.body;
  const { id } = req.params;

  const updatedPost = await Blog.findByIdAndUpdate(id, body, { new: true });
  console.log(updatedPost);
  res.redirect("/blog");
});




const bootstrap = async () => {
  try {
    await connectDB();

    app.listen(8080, () => {
      console.log("Server is listening on port 8080");
    });
  } catch (e) {
    console.error(e);
    throw new Error(e);
  }
};

bootstrap();