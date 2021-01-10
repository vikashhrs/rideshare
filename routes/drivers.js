import express, { response } from 'express'
import asyncHandler from 'express-async-handler'
import Driver from '../models/Driver.js'

const router = express.Router()

router.get(
  '/',
  asyncHandler(async (req, res) => {
    let drivers = await Driver.find()
    res.json(drivers)
  })
)

router.post(
  '/',
  asyncHandler(async (req, res) => {
    let driver = new Driver(req.body)
    let response = await driver.save()
    res.json(response)
  })
)

router.get(
  '/:_id',
  asyncHandler(async (req, res) => {
    const driver = await Driver.findById(req.params._id)
    if (driver) {
      res.json(driver)
    } else {
      res.status(404)
      throw new Error('Driver not found!')
    }
  })
)

router.patch(
  '/:_id',
  asyncHandler(async (req, res) => {
    const driver = await Driver.findOneAndUpdate(
      { _id: req.params._id },
      req.body,
      { new: true }
    )
    if (driver) {
      res.json(driver)
    } else {
      res.status(404)
      throw new Error('Driver not found!')
    }
  })
)

export default router
