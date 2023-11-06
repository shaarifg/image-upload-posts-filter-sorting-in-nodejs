const express = require("express");
const fileUpload = require("express-fileupload");
const db = require("./db");
const app = express();

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);
//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//database connection method
db.createDbConnection();

//complete documentation will be provided on home api
// let docmentation = "Hello Mohd Sharif, how are you?";
// app.use("/", (req, res) => {
//   res.send(docmentation);
// });

//posts related routes
const postRoutes = require("./routes/posts.routes");
app.use("", postRoutes);

//starting server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Sharif's server is running on http://localhost:${PORT}`);
});
