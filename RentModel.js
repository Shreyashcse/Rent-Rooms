const { model, Schema } = require('../connection');


const mySchema = new Schema({
    name: String,
    type: String,
    facilities: String,
    address: String,
    rent: Number,
    security: Number,
    contact: String,
    image: String
});

module.exports = model('rent', mySchema);
