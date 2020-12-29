"use strict";

var NeDB = require('nedb');

var db = new NeDB({
  filename: 'users.db',
  autoload: true
});

module.exports = function (app) {
  var route = app.route('/users');
  route.get(function (req, res) {
    db.find({}).sort({
      name: 1
    }).exec(function (err, users) {
      if (err) {
        app.utils.error.send(err, req, res);
      } else {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json({
          users: users
        });
      }
    });
  });
  route.post(function (req, res) {
    if (!app.utils.validator.user(app, req, res)) return false;
    db.insert(req.body, function (err, user) {
      if (err) {
        app.utils.error.send(err, req, res);
      } else {
        res.status(200).json(user);
      }
    });
  });
  var routeId = app.route('/users/:id');
  routeId.get(function (req, res) {
    db.findOne({
      _id: req.params.id
    }).exec(function (err, user) {
      if (err) {
        app.utils.error.send(err, req, res);
      } else {
        res.status(200).json(user);
      }
    });
  });
  routeId.put(function (req, res) {
    if (!app.utils.validator.user(app, req, res)) return false;
    db.update({
      _id: req.params.id
    }, req.body, function (err) {
      if (err) {
        app.utils.error.send(err, req, res);
      } else {
        res.status(200).json(Object.assign(req.params, req.body));
      }
    });
  });
  routeId["delete"](function (req, res) {
    db.remove({
      _id: req.params.id
    }, {}, function (err) {
      if (err) {
        app.utils.error.send(err, req, res);
      } else {
        res.status(200).json(req.params);
      }
    });
  });
};