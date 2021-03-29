const ObjectId = require('mongodb').ObjectId;

module.exports = function (app, passport, db) {
  // normal routes ===============================================================

  // show the home page (will also have our login links)
  app.get('/', function (req, res) {
    res.render('index.ejs');
  });

  // PROFILE SECTION =========================
  app.get('/profile', isLoggedIn, function (req, res) {
    db.collection('notes')
      .find()
      .toArray((err, result) => {
        if (err) return console.log(err);
        res.render('profile.ejs', {
          user: req.user,
          notes: result,
        });
      });
  });

  // LOGOUT ==============================
  app.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
  });

  // message board routes ===============================================================

  app.post('/messages', (req, res) => {
    db.collection('notes').save(
      { to: req.body.to, from: req.body.from, note: req.body.note, heart: 0 },
      (err, result) => {
        if (err) return console.log(err);
        console.log('saved to database');
        res.redirect('/profile');
      },
    );
  });

  app.put('/messages', async (req, res) => {
    try {
      //this is refering to the route that we refer to when we fetch
      console.log('THIS IS THE REQ BODY', req.body.heart);
       await db
        .collection('notes') //this is not the route, this is the referring to the collection called messages on mongo
        .findOneAndUpdate(
          { _id: ObjectId(req.body._id) },
          {
            $set: {
              heart: Number(req.body.heart) + 1,
            },
          },
        );
    } catch (e) {
      console.error(e);
    }

    res.redirect(303, '/profile');
  });

  app.delete('/messages', (req, res) => {
    db.collection('notes').findOneAndDelete(
      { _id: ObjectId(req.body._id) },
      (err, result) => {
        if (err) return res.send(500, err);
        res.send('Message deleted!');
      },
    );
  });

  // =============================================================================
  // AUTHENTICATE (FIRST LOGIN) ==================================================
  // =============================================================================

  // locally --------------------------------
  // LOGIN ===============================
  // show the login form
  app.get('/login', function (req, res) {
    res.render('login.ejs', { message: req.flash('loginMessage') });
  });

  // process the login form
  app.post(
    '/login',
    passport.authenticate('local-login', {
      successRedirect: '/profile', // redirect to the secure profile section
      failureRedirect: '/login', // redirect back to the signup page if there is an error
      failureFlash: true, // allow flash messages
    }),
  );

  // SIGNUP =================================
  // show the signup form
  app.get('/signup', function (req, res) {
    res.render('signup.ejs', { message: req.flash('signupMessage') });
  });

  // process the signup form
  app.post(
    '/signup',
    passport.authenticate('local-signup', {
      successRedirect: '/profile', // redirect to the secure profile section
      failureRedirect: '/signup', // redirect back to the signup page if there is an error
      failureFlash: true, // allow flash messages
    }),
  );

  // =============================================================================
  // UNLINK ACCOUNTS =============================================================
  // =============================================================================
  // used to unlink accounts. for social accounts, just remove the token
  // for local account, remove email and password
  // user account will stay active in case they want to reconnect in the future

  // local -----------------------------------
  app.get('/unlink/local', isLoggedIn, function (req, res) {
    var user = req.user;
    user.local.email = undefined;
    user.local.password = undefined;
    user.save(function (err) {
      res.redirect('/profile');
    });
  });
};

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();

  res.redirect('/');
}
