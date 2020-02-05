const app = require("./end-points.js");
const database = require("./database.js");
const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log("Server started on port: ", port);
  database.initiateDatabase();
});
