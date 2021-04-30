const ErrorResponse = require('../helpers/ErrorResponse');
const asyncHandle = require('../middlewares/asyncHandle');
const Post = require('../models/Post');

module.exports = {

    // @route POST /api/posts
    // @desc create post 
    // @access private
    create: asyncHandle( async (req, res, next) => {
        const { title, description, status } = req.body;

        // Simple validation
        if(!title) 
            return next(new ErrorResponse(400, 'Title is required'));
        
        const newPost = new Post({
                title,
                description,
                status: status || 'Active',
                user: req.userId,
        });

        await newPost.save();

        res.json({
            success: true, 
            message: 'Created post successfully', 
            post: newPost
        });

    }),

    // @route GET /api/posts
    // @desc Get posts
    // @access private
    getPosts: asyncHandle(async (req, res, next) => {
        const posts = await Post.find({ user: req.userId }).populate('user','username').sort({ 'createdAt': -1});

        res.json({
            success: true,
            posts: posts,
        })
    }),

    getPostById: asyncHandle( async (req, res, next) => {
        const post = await Post.findOne({user: req.userId, _id: req.params.id });

        if(post) {
            res.json({
                success: true,
                post: post,
            })
        } else {
            return next(new ErrorResponse(404, 'Post not found.'))
        }

    }),

    // @route PUT /api/posts/:id
    // @desc update post
    // @access private
    update: asyncHandle(async(req, res, next) => {
        const { title, description, status } = req.body;

        if(!title) 
            return next(new ErrorResponse(400, 'Title is required'))
        
        let updatedPost = {
            title,
            description: description || '',
            status: status || 'Active',
        }

        const postUpdateCondition = { _id: req.params.id, user: req.userId };

        updatedPost = await Post.findOneAndUpdate(
            postUpdateCondition,
            updatedPost,
            { new: true }
        )

        // User not authorised to update post or post not found
        if(!updatedPost) 
            return next(new ErrorResponse(401, 'Post not found or user not authorised'));

        res.json({
            success: true, 
            message: 'Updated post successfully', 
            post: updatedPost, 
        })

    }),

    // @route DELETE /api/post/:id
    // @desc Delete post
    // @access private
    destroy: asyncHandle( async (req, res, next) => {
        const postDeleteCondition = { _id: req.params.id, user: req.userId};
        const deletedPost = await Post.findOneAndDelete(postDeleteCondition);

        // User not authorised to delete post or post not found
        if(!deletedPost)
            return next(new ErrorResponse(401, 'Post not found or user not authorised'));
        
        res.json({
            success: true, 
            message: 'Deleted post successfully', 
            post: deletedPost
        })

    }),

}