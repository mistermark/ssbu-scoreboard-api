var LiveGame = require("../models/livegame");

exports.create = (req, res, next) => {
  const livegame = new LiveGame(req.body);

  if (!livegame.game) {
    return res.status(400).send("Game ID is missing");
  }

  livegame
    .save()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Something wrong while creating the livegame."
      });
    });
};

exports.get = (req, res, next) => {
  LiveGame.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
};

exports.update = (req, res, next) => {
  LiveGame.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(livegame => {
      if (!livegame) {
        return res.status(404).send({
          message: "LiveGame not found with id " + req.params.id
        });
      }
      res.send(livegame);
    })
    .catch(err => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "LiveGame not found with id " + req.params.id
        });
      }
      return res.status(500).send({
        message: "Something wrong updating livegame with id " + req.params.id
      });
    });
};

exports.delete = (req, res, next) => {
  LiveGame.findByIdAndRemove(req.params.id)
    .then(livegame => {
      if (!livegame) {
        return res.status(404).send({
          message: "LiveGame not found with id " + req.params.id
        });
      }
      res.send({ message: "LiveGame deleted successfully!" });
    })
    .catch(err => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "LiveGame not found with id " + req.params.id
        });
      }
      return res.status(500).send({
        message: "Could not delete livegame with id " + req.params.id
      });
    });
};
