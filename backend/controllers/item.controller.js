const Item = require("../models/item");

exports.findAll = (req, res) => {
  Item.find()
    .then((item) => {
      res.send(item);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
};

exports.findById = (req, res) => {
  Item.findById(req.params.id, (err, item) => {
    if (err) throw err;
    res.send(item);
  });
};

exports.addItem = (req, res) => {
  Item.create(req.body, (err, data) => {
    if (err) {
      throw err;
    }
    res.send(data);
  });
};

exports.removeById = (req, res) => {
  Item.findByIdAndRemove(req.params.id, (err, item) => {
    if (err) throw err;
    res.send(item);
  });
};

exports.updateById = (req, res) => {
  Item.findByIdAndUpdate(req.params.id, req.body, (err, item) => {
    if (err) throw err;
    res.send(item);
  });
};
