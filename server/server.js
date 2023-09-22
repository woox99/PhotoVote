//server.js file

const express = require('express');
const cors = require('cors');
const app = express();
const cookieParser = require('cookie-parser');

app.use(
    cookieParser(),
    cors({credentials: true, origin: 'http://localhost:3000'}),
    express.json(),
    express.urlencoded({ extended: true }),
);

require('dotenv').config();
require('./config/mongoose.config');
require('./routes/user.routes')(app);
require('./routes/poll.routes')(app);
require('./routes/photo.routes')(app);
require('./routes/vote.routes')(app);



app.listen(8000, () => {
    console.log('Listening on port 8000');
})