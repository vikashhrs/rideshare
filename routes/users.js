import express, { response } from 'express'
import asyncHandler from 'express-async-handler'
import User from '../models/User.js'

const router = express.Router()

router.get(
  '/',
  asyncHandler(async (req, res) => {
    let users = await User.find()
    res.json(users)
  })
)

router.post(
  '/',
  asyncHandler(async (req, res) => {
    let user = new User(req.body)
    let response = await user.save()
    res.json(response)
  })
)

router.get(
  '/:_id',
  asyncHandler(async (req, res) => {
    const user = await User.findById(req.params._id)
    if (user) {
      res.json(user)
    } else {
      res.status(404)
      throw new Error('User not found!')
    }
  })
)

router.patch(
  '/:_id',
  asyncHandler(async (req, res) => {
    const user = await User.findOneAndUpdate(
      { _id: req.params._id },
      req.body,
      { new: true }
    )
    if (user) {
      res.json(user)
    } else {
      res.status(404)
      throw new Error('User not found!')
    }
  })
)

export default router
