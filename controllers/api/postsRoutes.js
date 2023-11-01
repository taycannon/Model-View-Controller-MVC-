// Post Routes

const router = require('express').Router();
const { Post } = require('../../models'); 
const auth = require('../../utils/auth');

// Create a new post
router.post('/', auth, async (req, res) => {
  try {
    const newPost = await Post.create({ 
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Delete a post
router.delete('/:id', auth, async (req, res) => { 
  try {
    const postData = await Post.destroy({ 
      where: {
        id: req.params.id, 
        user_id: req.session.user_id,
      },
    });

    if (!postData) {
      res.status(404).json({ message: 'No post found with that ID!' });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
