import events from 'events'
import Ride from '../models/Ride.js'
import Driver from '../models/Driver.js'

const rideMatcher = new events.EventEmitter()

rideMatcher.on('ride_created', async (ride_id) => {
  let ride = await Ride.findById(ride_id)
  let count = 1
  let coordinates = ride.source.coordinates
  if (ride.status == 'requested') {
    let continuos = setInterval(async () => {
      if (count == 120) {
        ride['status'] = 'rejected'
        await ride.save()
        clearInterval(continuos)
      } else {
        let driver = await Driver.findOne({
          location: {
            $near: {
              $geometry: {
                type: 'Point',
                coordinates,
              },
              $maxDistance: 10000,
            },
          },
          upcoming_assigned: false,
        })
        if (driver) {
          driver['upcoming_assigned'] = true
          ride['driver'] = driver._id
          await driver.save()
          await ride.save()
          clearInterval(continuos)
        }
      }
      count++
    }, 1000)
  }
})

export default rideMatcher
