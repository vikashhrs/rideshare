import express from 'express'
import bodyParser from 'body-parser'
import colors from 'colors'
import { notFoundHandler, errorHadler } from './middlewares/errorMiddlewares.js'
import connectDB from './config/db.js'

import userRoutes from './routes/users.js'
import driverRoutes from './routes/drivers.js'
import rideRoutes from './routes/rides.js'

connectDB()

const PORT = process.env.PORT || 5000
const ENV = process.env.NODE_ENV || 'development'
const app = express()

app.use(bodyParser.json())
app.get('/', (req, res) => {
  res.send('Api working!')
})

app.use('/api/users', userRoutes)
app.use('/api/drivers', driverRoutes)
app.use('/api/rides', rideRoutes)

app.use(notFoundHandler)

app.use(errorHadler)

app.listen(
  PORT,
  console.log(`Server running in ${ENV}  port ${PORT}`.yellow.bold)
)
