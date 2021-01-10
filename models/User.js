import mongoose from 'mongoose'
const Schema = mongoose.Schema

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone_number: {
      type: Number,
      unique: true,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    rides_taken: {
      type: Number,
      default: 0,
    },
    location: {
      type: { type: String, default: 'Point' },
      coordinates: { type: [Number] },
    },
    riding: {
      type: Boolean,
      default: false,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
)

const User = mongoose.model('User', userSchema)

export default User
