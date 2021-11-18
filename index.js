const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const Film = require("./models/movies");
const methodOverride = require('method-override')

mongoose
  .connect("mongodb://localhost:27017/movies")
  .then(() => {
    console.log("database connected succesfully");
  })
  .catch((err) => {
    console.log("error occured");
  });

app.set("view engine", "ejs");
app.set("View", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'))

app.get("/", async (req, res) => {
  var newFilm = await Film.find({});
  res.render("index",{ newFilm });
});

app.get("/product/:id", async (req, res) => {
  const newP = await Film.findById(req.params.id);
  res.render("detail", { newP });
});
app.get("/products/new", (req, res) => {
  res.render("newmovie");
});

app.post("/product/new", (req, res) => {
  Film.insertMany(req.body);
  res.redirect("/");
});
app.get("/product/:id/edit", async(req, res) => {
  const newP = await Film.findById(req.params.id);
  res.render("editmovie" , { newP});
})

app.patch("/product/:id/edit", async(req, res) => {
  const {id} = req.params
  await Film.findByIdAndUpdate(id , req.body)
  res.redirect('/product/'+id)
});
app.delete("/product/:id/delete", async(req, res)=>{
  await Film.findByIdAndDelete(req.params.id)
  res.redirect('/')
})

app.listen(3000, () => {
  console.log("app listening on port 3000");
});
