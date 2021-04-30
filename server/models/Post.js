const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PostSchema = new Schema({
    title: {
        type: String,
        require: true,
    },
    description: {
        type: String,
    },
    status: {
        type: String,
        enum: ['Active', 'Completed'],
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users',
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model('posts', PostSchema);