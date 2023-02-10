const mongoose = require('mongoose')

const planet_schema = new mongoose.Schema({
        name: String,
        orderFromSun: Number,
        hasRings: Boolean,
        mainAtmosphere: [String],
        surfaceTemperatureC: [{
            min: Number,
            max: Number,
            mean: Number
        }]
})

module.exports = planet_schema