const mongoose = require('mongoose')
const Schema = mongoose.Schema


const movieSchema = new Schema({
    'name': String,
    'year': Number
})

const Film = mongoose.model('Film', movieSchema)

module.exports = Film