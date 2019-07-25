const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

const mongoose = require('mongoose')
const Post = mongoose.model('Post')
const Comment = mongoose.model('Comment')

router.get('/posts', function(req, res, next) {
  Post.find(function(err, posts) {
    if (err) { return next(err); }
    res.json(posts);
  });
});

router.get('/posts/:post', function(req, res, next) {
  req.post.populate('comments', function(err, post) {
    if (err) { return next(err) }
    res.json(post)
  })
})

router.post('/posts', function(req, res, next) {
  const post = new Post(req.body);
  post.save(function(err, post) {
    if (err) { return next(err); }
    res.json(post);
  });
});

router.post('/posts/:post/comments', function(req, res, next) {
  const comment = new Comment(req.body)
  comment.post = req.post

  comment.save( function(err, comment) {
    if (err) { return next(err) }
    req.post.comments.push(comment)

    req.post.save( function(err, comment) {
      if (err) { next (err) }
      res.json(comment)
    })
  })
})

router.param('post', function(req, res, next, id) {
  const query = Post.findById(id)

  query.exec(function(err, post) {
    if (err) { return next(err) }
    if (!post) { next(new Error('can\'t find post')) }

    req.post = post
    return next()
  })
})

router.param('comment', function(req, res, next, id) {
  const query = Comment.findById(id)

  query.exec(function(err, comment) {
    if (err) { return next(err) }
    if (!comment) { next(new Error('can\'t find comment')) }

    req.comment = comment
    return next()
  })
})

router.put('/posts/:post/comments/:comment/upvote', function(req, res, next) {
  req.comment.upvote(function(err, post) {
    if (err) { return next(err) }
    res.json(post)
  })
})

router.put('/posts/:post/upvote', function(req, res, next) {
  req.post.upvote(function(err, post) {
    if (err) { return next(err) }
    res.json(post)
  })
})

module.exports = router;
