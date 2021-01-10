import mongoose from 'mongoose'
mongoose.Promise = global.Promise
const MONGO_URI =
  'mongodb+srv://vikash:ZuqJJIIM9H1XbL9j@rideshare.q4anc.mongodb.net/rideshare'
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    })
    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline)
  } catch (error) {
    console.error(
      `MongoDB Conection Error: ${error.message}`.red.underline.bold
    )
    process.exit(1)
  }
}

export default connectDB
