var express = require('express');
var router = express.Router();
const passport = require('passport')
const userModel = require('./users');
const localStrategy = require('passport-local');
passport.use(new localStrategy(userModel.authenticate()))

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/login', function(req, res, next) {
  res.render('login')
  console.log('test')
})

router.get('/profile', isLoggedIn, function(req, res, next) {
  console.log('Profile route')
  userModel.findOne({username : req.session.passport.user})
  .then(function(user) {
    res.render('profile', {user})

  }) 
})

router.post('/reg', (req, res ,next) => {
  const details = new userModel({
    name : req.body.name,
    email : req.body.email,
    username : req.body.username
  });
  userModel.register(details, req.body.password)
    .then((registeredUser) => {
      passport.authenticate('local')(req, res, function() {
        console.log(registeredUser)
        res.redirect('/profile')
      })
    })
});


router.post('/login', passport.authenticate('local', {
  successRedirect : '/profile',
  failureRedirect : '/login'
}), (req, res, next) => {
  console.log('test')
})

router.get('/logout', (req, res, next) => {
  req.logOut();
  console.log('User LoggedOut Succesfully!')
  res.redirect('/')
})

function isLoggedIn(req, res, next) {
  if(req.isAuthenticated()) {
    return next();
  }
  else {
    res.redirect('/login')

  }
}


module.exports = router;
