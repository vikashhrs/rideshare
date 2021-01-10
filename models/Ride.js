import mongoose from 'mongoose'
const Schema = mongoose.Schema

const rideSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    driver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Driver',
    },
    source: {
      type: { type: String, default: 'Point', required: true },
      coordinates: { type: [Number] },
    },
    // Line of geo points Since ride can be of multi drop
    destination: {
      type: { type: String, default: 'LineString', required: true },
      coordinates: Array,
    },
    status: {
      type: String,
      enum: [
        'requested',
        'rejected',
        'assigned',
        'accepted',
        'ongoing',
        'completed',
        'cancelled',
      ],
      default: 'requested',
    },
    vehicle_type: {
      type: String,
      enum: ['micro', 'mini', 'bike', 'luxury'],
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
)

rideSchema.index({ user: 'text' })
rideSchema.index({ driver: 'text' })
const Ride = mongoose.model('Ride', rideSchema)

export default Ride
