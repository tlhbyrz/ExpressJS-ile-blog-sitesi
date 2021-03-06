const express = require("express");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const app = express();

const Article = require("./models/article");

mongoose
  .connect("YOUR_MONGODB_URİ", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: false
  })
  .then(conncetion => {
    console.log("mongodb is connected");
  })
  .catch(err => {
    console.log("mongodb error:", err.message);
  });

//bu req in içindeki verilerre erişmemizi sağlıyor
app.use(express.urlencoded({ extended: false }));

// bu kütüphane de formdan gelen requestleri put delete vs dönüştürüyor.
app.use(methodOverride("_method"));
const articleRoutes = require("./routes/articles");

//layout için kullanıyoruz
app.set("view engine", "ejs");

app.use("/articles", articleRoutes);

app.get("/", async (req, res) => {
  const articles = await Article.find().sort({ date: "desc" });
  res.render("articles/index", { articles: articles });
});

app.listen(5000);
