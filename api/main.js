import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
dotenv.config();
const app = express();
import router from "./routes/shortify";
app.use(bodyParser.json());

// mongoose init
mongoose.Promise = global.Promise;
mongoose.set('debug', true);
mongoose.connect(
    process.env.MONGOURI, {
        keepAlive: true,
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
);

// app function declaration
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-type,Accept,x-access-token,X-Key');
    if (req.method == 'OPTIONS') {
        res.status(200).end();
    } else {
        next();
    }
});

app.use('/api/v1', router);

// app listening to port
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port} 🔥`));