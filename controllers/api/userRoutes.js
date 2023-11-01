// User Routes

const router = require('express').Router();
const { User } = require('../../models');

// Create a new user
router.post('/', async (req, res) => {
  try {
    const dbUserData = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });

    req.session.save(() => {
      req.session.loggedIn = true;
      res.status(200).json(dbUserData);
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to create a new user.' });
  }
});

// User login
router.post('/login', async (req, res) => {
  try {
    const dbUserData = await User.findOne({ where: { email: req.body.email } });
    if (!dbUserData) {
      return res.status(400).json({ message: 'Incorrect email or password. Try again.' });
    }

    const validPassword = await dbUserData.checkPassword(req.body.password);
    if (!validPassword) {
      return res.status(400).json({ message: 'Incorrect email or password. Try again.' });
    }

    req.session.save(() => {
      req.session.loggedIn = true;
      res.status(200).json({ user: dbUserData, message: 'You are logged in.' });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to log in.' });
  }
});

// User logout
router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).json({ message: 'No user is currently logged in.' });
  }
});

module.exports = router;
