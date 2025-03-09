const express = require('express');
const cors = require('cors');
const app = express();
const dotenv = require('dotenv');
const path = require('path');

const connectDatabase = require('./config/database');

dotenv.config({ path: path.join(__dirname, 'config', 'config.env') });

// Middleware
app.use(cors({
    origin: "https://visionary-queijadas-f80d14.netlify.app", 
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));


connectDatabase();


app.use('/auth', require('./routes/auth'));

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
