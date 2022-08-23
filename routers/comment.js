const express = require('express');
const router = new express.Router();
const Comment = require('../models/comment');
const Workshop = require('../models/workshop');
const { check, validationResult } = require('express-validator');

const reviews = require('../data/commentsData');

// @GET - Load more comments
// @route - /comments?limit=10&skip=20
// @access - Public
router.get('/comments', async (req, res) => {
  try {
    const limitNum = parseInt(req.query.limit);
    const skipNum = parseInt(req.query.skip);

    const comments = await Comment.find({}).limit(limitNum).skip(skipNum).sort({ date: -1 });
    return res.json(comments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('server error');
  }
});

// @GET - Get comments count
// @route - /comments/count
// @access - Public
router.get('/comments/count', async (req, res) => {
  try {
    const count = await Comment.find({}).count();
    return res.json({ count });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('server error');
  }
});

// @POST - Create a new comment - Sort by date (DESC)
// NOTE: Works only if user attended a workshop, and user can only comment once. In MongoDB, "participants.email" (in Workshop) & "email" (in Comments) are stored as indexes for fast response time - O(log(n)).
// @route - /comments
// @access - Public
router.post('/comments', async (req, res) => {
  try {
    const userWithEmail = await Workshop.findOne({ 'participants.email': req.body.email });

    if (userWithEmail) {
      const userAlreadyCommented = await Comment.findOne({ email: req.body.email });

      if (userAlreadyCommented) {
        return res.status(400).send('משתמש זה יצר תגובה בעבר');
      }

      const comment = new Comment({
        name: req.body.name,
        content: req.body.content,
        reviewScore: req.body.reviewScore,
        email: req.body.email,
        date: req.body.date,
      });

      await comment.save();
      return res.status(201).send(comment);
    }

    return res.status(404).send('המשתמש לא נרשם לסדנה עם מייל זה');
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('server error');
  }
});

module.exports = router;
