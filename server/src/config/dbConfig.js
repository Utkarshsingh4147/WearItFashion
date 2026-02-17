const mongoose = require('mongoose')

const dbConfig = async () => {
    try{
        await mongoose.connect(`${process.env.MONGO_URL}/wearitfashion`)
        console.log("Database connected successfully")
    }
    catch(error) {
        console.log("Error connecting database")
    }
}

module.exports = dbConfig;