var Gameset = require("../models/gameset");

exports.create = (req, res, next) => {
  const gameset = new Gameset(req.body);

  if (!gameset.player1 && gameset.player2 && gameset.game) {
    return res.status(400).send("Players data are missing");
  }

  gameset
    .save()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Something wrong while creating the gameset."
      });
    });
};

exports.getAll = (req, res, next) => {
  Gameset.find((error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
};

exports.update = (req, res, next) => {
  Gameset.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(gameset => {
      if (!gameset) {
        return res.status(404).send({
          message: "GameSet not found with id " + req.params.id
        });
      }
      res.send(gameset);
    })
    .catch(err => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "GameSet not found with id " + req.params.id
        });
      }
      return res.status(500).send({
        message: "Something wrong updating gameset with id " + req.params.id
      });
    });
};

exports.delete = (req, res, next) => {
  Gameset.findByIdAndRemove(req.params.id)
    .then(gameset => {
      if (!gameset) {
        return res.status(404).send({
          message: "Game-set not found with id " + req.params.id
        });
      }
      res.send({ message: "Game-set deleted successfully!" });
    })
    .catch(err => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "Game-set not found with id " + req.params.id
        });
      }
      return res.status(500).send({
        message: "Could not delete game-set with id " + req.params.id
      });
    });
};
