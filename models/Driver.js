import mongoose from 'mongoose'
const Schema = mongoose.Schema

const driverSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    phone_number: {
      type: Number,
      unique: true,
      required: true,
    },
    rides_completed: {
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
    vehicle_number: {
      type: String,
      unique: true,
    },
    vehicle_type: {
      type: String,
      enum: ['micro', 'mini', 'bike', 'luxury'],
      required: true,
    },
    upcoming_assigned: {
      type: Boolean,
      default: false,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
)
driverSchema.index({ location: '2dsphere' })
const Driver = mongoose.model('Driver', driverSchema)

export default Driver
