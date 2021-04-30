const User = require('../models/User');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const asyncHandle = require('../middlewares/asyncHandle');
const ErrorResponse = require('../helpers/ErrorResponse');

module.exports = {

    // @route POST /api/auth/register
    // @desc Register user
    // @access public
    register: asyncHandle( async (req, res, next) => {
        const { username, password } = req.body;

        // Simple validation
        if( !username || !password )
            return next( new ErrorResponse(400, 'Missing username and/or password'));

        // Check for existing username
        const user = await User.findOne({ username });

        if(user)
            return next(new ErrorResponse(400, 'Username already taken'));

        // All good
        const hashedPassword = await argon2.hash(password);

        const newUser = new User({ username, password: hashedPassword });
        await newUser.save();

        // Return token
        const accessToken = jwt.sign({userId: newUser._id}, process.env.TOKEN_ACCESS_SECRET);

        res.json({success: true, message: 'User create successfully', accessToken});
        
    } ),

    // @route POST /api/auth/login
    // @desc Login user
    // @access Public
    login: asyncHandle(async (req, res, next) => {
        const { username, password } = req.body;

        // Simple validation
        if( !username || !password ) 
            return next(new ErrorResponse(400, 'Missing username and/or password'))
        
        // Check for existing user
        const user = await User.findOne({ username });

        if(!user)
            return next(new ErrorResponse(400, 'Incorrect username or password'));

        // Username found
        const passwordValid = await argon2.verify(user.password, password);
        if(!passwordValid) 
            return next(new ErrorResponse(400, 'Incorrect username or password'));

        // All ok return token
        const accessToken = jwt.sign(
            {userId: user._id}, 
            process.env.TOKEN_ACCESS_SECRET,
        );

        res.json({
            success: true,
            message: 'User logged in successfully', 
            accessToken,
        });
    }),

    // @route GET /api/auth
    // @desc Check if user not found
    // @access public
    confirm: asyncHandle ( async (req, res, next) => {
        const user = await User.findById(req.userId).select('-password');

        if(!user)
            return next(new ErrorResponse(400, 'User not found'))
        
        res.json({success: true, user});
    }),
    
}