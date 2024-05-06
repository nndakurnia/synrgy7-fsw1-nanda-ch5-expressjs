const express = require("express");
const app = express();

const Router = require("./routes");

const PORT = 8000;

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set("view engine", "ejs");

app.get("/views", (req, res) => {
  res.render("index", { ...req.query });
});

app.use(Router);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
