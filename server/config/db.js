const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        const user = "admin12345"
        const password = user
        const url = `mongodb+srv://${user}:${password}@cluster0.m1y0a.mongodb.net/videoWeb?retryWrites=true&w=majority`
        const conn = await mongoose.connect(url, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true
        })

        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.log(`Error: ${error.message}`);
        process.exit(1);
    }
}

module.exports = connectDB