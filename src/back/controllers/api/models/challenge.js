const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Challenge = new Schema({
    category: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
    user: {type: Object, required: true}
});

module.exports = mongoose.model('Challenge', Challenge);
