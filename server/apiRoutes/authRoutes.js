const router = require('express').Router();
const passport = require('passport');

// test route /api/auth
router.get('/', (req, res) => {
  res.send('Made it to the AUTH page');
});

// google auth
router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
  })
);

router.get('/google/redirect', passport.authenticate('google'), (_, res) => {
  res.redirect('/');
});

// facebook auth
router.get(
  '/facebook',
  passport.authenticate('facebook', { scope: ['email'] })
);

router.get(
  '/facebook/redirect',
  passport.authenticate('facebook', {
    successRedirect: '/auth',
    failureRedirect: '/auth',
  })
);

router.get('/user', (req, res) => {
  if (req.isAuthenticated()) {
    res.json(req.user.dataValues);
  } else {
    res.json({ user: null });
  }
});

module.exports = router;
