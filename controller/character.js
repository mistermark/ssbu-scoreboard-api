var Character = require("../models/character");

function _verifyCharData(charactersData) {
  let verify = {
    field: null,
    valid: true,
    line: 0
  };
  for (const character of charactersData) {
    verify.line++;
    if (character.name === undefined) {
      verify.valid = false;
      verify.field = "name";
      return verify;
    }
    if (character.image === undefined) {
      verify.valid = false;
      verify.field = "image";
      return verify;
    }
  }
  return verify;
}

exports.create = (req, res, next) => {
  console.log(req.body);
  const character = new Character(req.body);

  if (!character.name) {
    return res.status(400).send("Character name is missing");
  }

  character
    .save()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Something wrong while creating the character."
      });
    });
};

exports.createBulk = (req, res, next) => {
  // Verify every line has required data
  const dataValid = _verifyCharData(req.body);

  if (dataValid.valid === false) {
    return res
      .status(400)
      .send(`Character on line ${dataValid.line} is missing data`);
  }

  Character.collection.insert(req.body, function(err, docs) {
    if (err) {
      return console.error(err);
    } else {
      console.log("Multiple documents inserted to Collection");
    }
  });
};

exports.get = (req, res) => {
  Character.find((error, response) => {
    if (error) {
      return next(error);
    } else {
      res.json(response);
    }
  });
};

exports.getCharacter = (req, res) => {
  Character.findById(req.params.id, (error, data) => {
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
      message: "Character content can not be empty"
    });
  }

  Character.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(character => {
      if (!character) {
        return res.status(404).send({
          message: "Character not found with id " + req.params.id
        });
      }
      res.send(character);
    })
    .catch(err => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Character not found with id " + req.params.id
        });
      }
      return res.status(500).send({
        message:
          "Something wrong updating character with id " + req.params.productId
      });
    });
};

exports.delete = (req, res, next) => {
  Character.findByIdAndRemove(req.params.id)
    .then(character => {
      if (!character) {
        return res.status(404).send({
          message: "Character not found with id " + req.params.id
        });
      }
      res.send({ message: "Character deleted successfully!" });
    })
    .catch(err => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "Character not found with id " + req.params.id
        });
      }
      return res.status(500).send({
        message: "Could not delete character with id " + req.params.id
      });
    });
};
