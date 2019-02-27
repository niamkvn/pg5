const History = require("../models/historyModel");

exports.get_all_historys = (req, res, next) => {
  History.find({})
    .then(docs => {
      res.status(200).render("s", {d: docs});
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
};

exports.post_history = (req, res, next) => {
  const dateNow = Date();
  const history = new History({
    date: dateNow,
    magnitude: req.body.pesan
  });

  history
    .save()
    .then(docs => {
      res.status(201).json({ docs });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
};
