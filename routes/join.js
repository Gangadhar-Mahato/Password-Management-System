var express = require('express');
var router = express.Router();
var userModule = require('../modules/user');
var passCatModel = require('../modules/password_category');
var passModel = require('../modules/add_password');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
var getPassCat = passCatModel.find({});
var getAllPass = passModel.find({});

/* GET home page. */

function checkLoginUser(req, res, next) {
  var userToken = localStorage.getItem('userToken');
  try {
    var decoded = jwt.verify(userToken, 'loginToken');
  } catch (err) {
    res.redirect('/');
  }
  next();
}

if (typeof localStorage === "undefined" || localStorage === null) {
  var LocalStorage = require('node-localstorage').LocalStorage;
  localStorage = new LocalStorage('./scratch');
}

function checkUsername(req, res, next) {
  var uname = req.body.uname;
  var checkexistusername = userModule.findOne({ username: uname });
  checkexistusername.exec((err, data) => {
    if (err) throw err;
    if (data) {
      return res.render('signup', { title: 'Password Management System', msg: 'Username` already exists.' });
    }
    next();
  });
}

function checkEmail(req, res, next) {
  var email = req.body.email;
  var checkexistemail = userModule.findOne({ email: email });
  checkexistemail.exec((err, data) => {
    if (err) throw err;
    if (data) {
      return res.render('signup', { title: 'Password Management System', msg: 'Email already exists.' });
    }
    next();
  });
}

router.get('/', checkLoginUser, function (req, res, next) {
    var loginUser = localStorage.getItem('loginUser');
    
        
        passModel.aggregate([
            {
                $lookup:
                    {
                        from: "password_categories",
                        localField:"password_category",
                        foreignField:"password_category",
                        as:"pass_cat_details"
                    }
            },
            {$unwind : "$pass_cat_details"}
        ]).exec(function(err, results){
            if (err) throw err;
             console.log(results);
             res.send(results);
        })
    });
  
  module.exports = router;