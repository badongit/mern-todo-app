const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const connectDB = async () => {
    try {
        const connect = await mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.eenpf.mongodb.net/cluster0?retryWrites=true&w=majority`, {
            useCreateIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
        })

        console.log('Connected DB success');
    } catch (err) {
        console.log('Connect DB failed : ', err.message );
        process.exit(1);
    }
}

module.exports = connectDB;
