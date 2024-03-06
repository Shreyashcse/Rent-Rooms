const mongoose = require('mongoose');

const url = "mongodb+srv://radheyshyam2769:1234@cluster0.qvmcscr.mongodb.net/rentalrooms?retryWrites=true&w=majority"

// asynchronous function
mongoose.connect(url)
.then((result) => {
    console.log('database connected');
    
})
.catch((err) => {
    console.log(err);
});

module.exports = mongoose;