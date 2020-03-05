const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require('../config/config');

const User = require("../models/user");

exports.user_signup = (req, res, next) => {
  User.find({ telefon: req.body.telefon })
    .exec()
    .then(user => {
      if (user.length >= 1) {
        return res.status(409).json({
          message: "Bu Üye Kayıtlı.!"
        });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              error: err
            });
          } else {
            const user = new User({
              _id: new mongoose.Types.ObjectId(),
              telefon: req.body.telefon,
              password: hash,
              username: req.body.username,
              email: req.body.email
            });
            user
              .save()
              .then(result => {
                console.log(result);
                res.status(201).json({
                  message: "Üye Kaydedildi."
                });
              })
              .catch(err => {
                console.log(err);
                res.status(500).json({
                  error: err
                });
              });
          }
        });
      }
    });
};

exports.user_login = (req, res, next) => {
  User.find({ telefon: req.body.telefon })
    .exec()
    .then(user => {
      if (user.length < 1) {
        return res.status(401).json({
          message: "Giriş Hatalı"
        });
      }
      bcrypt.compare(req.body.password, user[0].password, (err, result) => {
        if (err) {
          return res.status(401).json({
            message: "Giriş Hatalı"
          });
        }
        if (result) {
          const token = jwt.sign(
            {
              telefon: user[0].telefon,
              userId: user[0]._id,
              username: user[0].username,
              email: user[0].email
            },
            config.key,
            {
              expiresIn: "1h"
            }
          );
          return res.status(200).json({
            message: "Giriş Başarılı",
            token: token
          });
        }
        res.status(401).json({
          message: "Giriş Hatalı"
        });
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};

exports.user_delete = (req, res, next) => {
  User.remove({ _id: req.params.userId })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "Üye Silindi."
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};
