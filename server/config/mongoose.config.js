const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/photovote', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then( () => console.log("Established a connection to the DB"))
    .catch( err => console.log("Something went wrong when connection to the DB", err))