const router = require('express').Router();
const { Posts, User } = require('../models');
const auth = require('../utils/auth');

// Home page route
router.get('/', async (req, res) => {
  try {
    const dbPostData = await Posts.findAll({
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });
    const posts = dbPostData.map((post) =>
      post.get({ plain: true })
    );
    res.render('homepage', {
      posts,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.error(err);
    res.status(500).render('error-view', { message: 'Internal server error' });
  }
});

// Single post route
router.get('/posts/:id', auth, async (req, res) => {
  try {
    // If the middleware passes, the user is authenticated
    const dbPostData = await Posts.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });

    if (!dbPostData) {
      res.status(404).render('error-view', { message: 'Post not found' });
      return;
    }

    const post = dbPostData.get({ plain: true });
    res.render('post', { post, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.error(err);
    res.status(500).render('error-view', { message: 'Internal server error' });
  }
});

// Login route
router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  res.render('login');
});

module.exports = router;
