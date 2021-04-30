const express = require('express');
const cors = require('cors');

const connectDB = require('./config/database');

const router = require('./routers');

const app = express();

app.use(express.json());
app.use(cors());

connectDB();

router(app);

const PORT = procress.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`);
})