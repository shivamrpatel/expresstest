const express = require('express')
const app = express()
const port = 8001

const mongoose = require('mongoose')
const mongodb_URI = "mongodb+srv://shivamp3:nemqor-7qEkxo-jywmij@cluster0.okra1n3.mongodb.net/sample_guides?retryWrites=true&w=majority"
const planet_schema = require('./schema.js')
mongoose.set('strictQuery', true) // ignore deprecation
const Planet = mongoose.model('Planet', planet_schema)


try {

    mongoose.connect(mongodb_URI, {useNewUrlParser: true, useUnifiedTopology: true},
        () => console.log("Mongoose successfully connected to database")
    );

} catch (e) {
    console.log("Could not connect to the database");
}


app.use(express.json())

app.listen(port, () => console.log("Server started..."))


app.get("/planet/:id", async (request, response) => {

        try {
            const data = await Planet.findOne({ orderFromSun: request.params.id })

            response.send(data.name)
        } catch (e) {
            response.send("Planet doesn't exist, are you dumb?")
        }

})

app.post("/planet/add", async (request, response) => {

    const planet = new Planet({
        ...request.body
    })

    try {
        const planet_upload = await planet.save()
    } catch(e) {
        console.log("How you mess this up?")
    }

})








// "mongodb+srv://shivamp3:nemqor-7qEkxo-jywmij@cluster0.okra1n3.mongodb.net/?retryWrites=true&w=majority"
// db password: nemqor-7qEkxo-jywmij

// http://localhost:8001