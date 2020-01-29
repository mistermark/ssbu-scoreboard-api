var Player = require("../models/player");

exports.create = (req, res, next) => {
  const player = new Player(req.body);

  if (!player.name) {
    return res.status(400).send("Player name is missing");
  }

  player
    .save()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Something wrong while creating the player."
      });
    });
};

exports.get = (req, res) => {
  Player.find((error, response) => {
    if (error) {
      return next(error);
    } else {
      res.json(response);
    }
  });
};

exports.getPlayer = (req, res) => {
  Player.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
};

exports.update = (req, res, next) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Player content can not be empty"
    });
  }

  Player.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(player => {
      if (!player) {
        return res.status(404).send({
          message: "Player not found with id " + req.params.id
        });
      }
      res.send(player);
    })
    .catch(err => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Player not found with id " + req.params.id
        });
      }
      return res.status(500).send({
        message:
          "Something wrong updating player with id " + req.params.productId
      });
    });
};

exports.delete = (req, res, next) => {
  Player.findByIdAndRemove(req.params.id)
    .then(player => {
      if (!player) {
        return res.status(404).send({
          message: "Player not found with id " + req.params.id
        });
      }
      res.send({ message: "Player deleted successfully!" });
    })
    .catch(err => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "Player not found with id " + req.params.id
        });
      }
      return res.status(500).send({
        message: "Could not delete player with id " + req.params.id
      });
    });
};
