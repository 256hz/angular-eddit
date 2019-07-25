var mongoose = require('mongoose')

var PostSchema = new mongoose.Schema({
    title: String,
    link: String,
    upvotes: {type: Number, default: 0},
    comments: [{type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}]
})

PostSchema.methods.upvote = function(post) {
    this.upvotes += 1
    this.save(post)
}

mongoose.model('Post', PostSchema)