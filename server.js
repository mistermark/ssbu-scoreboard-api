let express = require("express"),
  path = require("path"),
  createError = require("http-errors"),
  cors = require("cors"),
  bodyParser = require("body-parser");

require("dotenv").config({ path: __dirname + "/.env" });
require("./database/db");
require("./models/player");
require("./models/gameset");
require("./models/livegame");
require("./models/character");
require("./models/stage");

global.appDir = path.resolve(__dirname);
const { APP_PORT, ALLOWED_DOMAIN } = process.env;

// Setting up port with express js
const playerRoute = require("./routes/player.route");
const gamesetRoute = require("./routes/gameset.route");
const liveGameRoute = require("./routes/livegame.route");
const characterRoute = require("./routes/character.route");
const stageRoute = require("./routes/stage.route");
const uploadRoute = require("./routes/upload.route");
const app = express();

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

var corsOptions = {
  origin: ALLOWED_DOMAIN,
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
app.use(express.static(path.join(__dirname, "dist/mean-stack-crud-app")));
app.use("/", express.static(path.join(__dirname, "dist/mean-stack-crud-app")));
app.use("/api/players", playerRoute);
app.use("/api/sets", gamesetRoute);
app.use("/api/live", liveGameRoute);
app.use("/api/characters", characterRoute);
app.use("/api/stages", stageRoute);
app.use("/api/upload", uploadRoute);

// Create port
const port = APP_PORT || 4000;
const server = app.listen(port, () => {
  console.log(`App listening on ${port}!`);
});

// Find 404 and hand over to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  console.error(err.message); // Log error message in our server's console
  if (!err.statusCode) err.statusCode = 500; // If err has no specified error code, set error code to 'Internal Server Error (500)'
  res.status(err.statusCode).send(err.message); // All HTTP requests must have a response, so let's send back an error with its status code and message
});
