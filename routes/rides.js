import express, { response } from 'express'
import asyncHandler from 'express-async-handler'
import Ride from '../models/Ride.js'

import rideMatcher from '../handlers/rideMatcher.js'

const router = express.Router()

router.get(
  '/',
  asyncHandler(async (req, res) => {
    let query = req.query
    let rides = await Ride.find(query)
    res.json(rides)
  })
)

router.post(
  '/',
  asyncHandler(async (req, res) => {
    let ride = new Ride(req.body)
    let response = await ride.save()
    rideMatcher.emit('ride_created', ride._id)
    res.json(response)
  })
)

router.get(
  '/:_id',
  asyncHandler(async (req, res) => {
    const ride = await Ride.findById(req.params._id)
    if (ride) {
      res.json(ride)
    } else {
      res.status(404)
      throw new Error('Ride not found!')
    }
  })
)

router.patch(
  '/:_id',
  asyncHandler(async (req, res) => {
    const ride = await Ride.findOneAndUpdate(
      { _id: req.params._id },
      req.body,
      { new: true }
    )
    if (ride) {
      res.json(ride)
    } else {
      res.status(404)
      throw new Error('Ride not found!')
    }
  })
)

export default router
