var Stage = require("../models/stage");

exports.create = (req, res, next) => {
  console.log(req.body);
  const stage = new Stage(req.body);

  if (!stage.name) {
    return res.status(400).send("Stage name is missing");
  }

  stage
    .save()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Something wrong while creating the stage."
      });
    });
};

exports.get = (req, res) => {
  Stage.find((error, response) => {
    if (error) {
      return next(error);
    } else {
      res.json(response);
    }
  });
};

exports.getStage = (req, res) => {
  Stage.findById(req.params.id, (error, data) => {
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
      message: "Stage content can not be empty"
    });
  }

  Stage.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(stage => {
      if (!stage) {
        return res.status(404).send({
          message: "Stage not found with id " + req.params.id
        });
      }
      res.send(stage);
    })
    .catch(err => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Stage not found with id " + req.params.id
        });
      }
      return res.status(500).send({
        message:
          "Something wrong updating stage with id " + req.params.productId
      });
    });
};

exports.delete = (req, res, next) => {
  Stage.findByIdAndRemove(req.params.id)
    .then(stage => {
      if (!stage) {
        return res.status(404).send({
          message: "Stage not found with id " + req.params.id
        });
      }
      res.send({ message: "Stage deleted successfully!" });
    })
    .catch(err => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "Stage not found with id " + req.params.id
        });
      }
      return res.status(500).send({
        message: "Could not delete stage with id " + req.params.id
      });
    });
};
