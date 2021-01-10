# Actions on user model

POST /users for creating user
JSON payload
{name, email, location}

GET /users/<\_id> for getting user data by \_id

PATH /users/<\_id> where \_id is the unique user id, can be used for updating user data like location etc
JSON payload
{name, email, location}

# For creating driver

POST /drivers for creating a driver
JSON payload
(name, phone_number, location, vehicle_number, vehicle_type)

GET /drivers/<\_id> for getting user data by \_id

PATCH /drivers/<\_id> where \_id is the unique user id, can be used for updating driver data like location etc
JSON payload
(name, phone_number, location, vehicle_number, vehicle_type)

# For creating ride
