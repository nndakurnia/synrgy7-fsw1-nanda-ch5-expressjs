const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();

const Router = require("./routes");
const { datas } = require("./services/peopleServices");

const PORT = process.env.PORT || 3000;

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set("view engine", "ejs");
app.set("views", "public/views");

// GET /?name=Nanda
app.get("/views", (req, res) => {
  res.render("index", { name: req.query.name || "Bunny" });
});

app.get("/views/people", (req, res) => {
  const people = datas();
  res.render("people/index", {
    people,
  });
});

app.use(Router);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
