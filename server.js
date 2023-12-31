const path = require("path");
const express = require("express");
const app = express();
const { logger } = require("./middleware/logEvents");
const PORT = process.env.PORT || 3500;
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const errorHandler = require("./middleware/errorHandler");

// CUSTOM MIDDLEWARE
app.use(logger);

// THIRD PARTY MIDDLEWARE
app.use(cors(corsOptions));

// MIDDLEWARE
app.use(express.urlencoded({ extended: false })); //for form data
app.use(express.json()); //for JSON
app.use(express.static(path.join(__dirname, "public"))); // for static files
app.use("/subdir", express.static(path.join(__dirname, "public"))); // for static files for subdir

app.use("/", require("./routes/root"));
app.use("/subdir", require("./routes/subdir"));
app.use("/employees", require("./routes/api/employees"));
app.use("/register", require("./routes/register"));
app.use("/auth", require("./routes/auth"));

app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ error: "404 Not Found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
