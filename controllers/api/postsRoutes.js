//Post Routes

const router = require('express').Router();
const { Posts } = require('../../models');
const auth = require('../../utils/auth');

router.post('/', auth, async (req, res) => {
  try {
    const newPost = await posts.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('', auth, async (req, res) => {
  try {
    const postsData = await posts.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!postsData) {
      res.status(404).json({ message: 'No project found with ID!' });
      return;
    }

    res.status(200).json(postsData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;