const errorHandle = require('../middlewares/errorHandle');
const authRouter = require('./auth');
const postRouter = require('./post');

module.exports = (app) => {
    
    app.use('/api/auth', authRouter);

    app.use('/api/posts', postRouter);

    app.use(errorHandle);
    
}