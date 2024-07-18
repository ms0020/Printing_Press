const prisma = require("../../utils/prisma");
require("dotenv").config();

// Add User Location
const addUserLocation = async (req, res) => {
    /*
     Add location in the VendorLocation DB table.
    Body:
        {
            "vendorId": Str,
            "latitude": Str,
            "longitude": Str,
            "locationName": Str,
            "houseDetails": Str,
            "areaDetails": Str
        }
    
    Response:
        Returns success with 200 status code.
    "data": {
                "locationId": Str,
                "vendorId": Str,
                "latitude": Str,
                "longitude": Str,
                "locationName": Str,
                "houseDetails": Str,
                "areaDetails": Str
            },
    "msg": "User location Added."
}
    */
    try {
        const { profileId, vendorId, latitude, longitude, locationName, houseDetails, areaDetails } = req.body;

        const newUserLocation = await prisma.location.create({
            data: {
                profileId: profileId || null,
                vendorId: vendorId || null,
                latitude: latitude,
                longitude: longitude,
                locationName: locationName,
                houseDetails: houseDetails,
                areaDetails: areaDetails
            }
        });
        return res.json({ status: 200, data: newUserLocation, msg: "User Location Added." })
    }
    catch (error) {
        return res.status(400).json({ message: error.message });
    }
};


// Fetch all Users Location
const fetchAllUsersLocations = async (req, res) => {
    /*
    Displays all the vendor's location in VendorLocartion DB table.
    response:
        Returns success with 200 status code.
    {
    "status": 200,
    "data": [
        {
            
                "locationId": Str,
                "vendorId": Str,
                "latitude": Str,
                "longitude": Str,
                "locationName": Str,
                "houseDetails": Str,
                "areaDetails": Str
        },
        .
        .
        {
            
                "locationId": Str,
                "vendorId": Str,
                "latitude": Str,
                "longitude": Str,
                "locationName": Str,
                "houseDetails": Str,
                "areaDetails": Str
        }
    ],
    "Here we get": "All Users Locations."
}
    */
    try {
        const locations = await prisma.location.findMany();
        return res.json({ status: 200, data: locations, "Here we get": "All Users Locations." })
    }
    catch (error) {
        return res.status(400).json({ message: error.message });
    }
};


// Fetch User Location by ID
const fetchUserLocationById = async (req, res) => {
    /*
      Displays the vendor's location by locationId in VendorLocation DB table.
      Params:
          path-parameter:
              locationId: Str
  
      Response:
          Returns success with 200 status code.
      "data": {
                    "locationId": Str,
                    "vendorId": Str,
                    "latitude": Str,
                    "longitude": Str,
                    "locationName": Str,
                    "houseDetails": Str,
                    "areaDetails": Str
              },
          "Here we get": "The Vendor Location."
  }
      */
    try {
        const locationId = req.params.id;
        const location = await prisma.location.findFirst({
            where: {
                locationId: locationId
            },
        });
        return res.json({ status: 200, data: location, "Here we get": "The User Location." })
    }
    catch (error) {
        return res.status(400).json({ message: error.message });
    }

};


// Update User by ID
const updateUserLocation = async (req, res) => {
    /*
   Updates the vendor by vendorId.
       Params:
          path-parameter:
              locationId: Str

       Body:
       {
           "vendorId": Str,
           "latitude": Str,
           "longitude": Str,
           "locationName": Str,
           "houseDetails": Str,
           "areaDetails": str
       }

       Response:
           Returns success with 200 status code.
       {
           "status": 200,
           "data": {
                        locationId: Str,
                        "vendorId": Str,
                        "latitude": Str,
                        "longitude": Str,
                        "locationName": Str,
                        "houseDetails": Str,
                        "areaDetails": str
                   },
           "message": "User location updated successfully."
}
   */
    try {
        const locationId = req.params.id;
        const { profileId, vendorId, latitude, longitude, locationName, houseDetails, areaDetails } = req.body;

        const updatedLocation = await prisma.location.update({
            where: {
                locationId: locationId
            },
            data: {
                profileId: profileId || null,
                vendorId: vendorId || null,
                latitude,
                longitude,
                locationName,
                houseDetails,
                areaDetails
            }
        });

        return res.json({ status: 200, data: updatedLocation, message: "User Location updated successfully." })
    }
    catch (error) {
        return res.status(400).json({ message: error.message });
    }
};


// Delete User Location by ID
const deleteUserLocation = async (req, res) => {
    /*
    Deletes the vendor by vendorId.
        Params:
           path-parameter:
               locationId: Str

        Response:
            Returns success with 200 status code.
        {
            "status": 200,
            "message": "User location deleted successfully."
        }
    */
    try {
        const locationId = req.params.id;
        await prisma.location.deleteMany({
            where: {
                locationId: locationId
            }
        });
        return res.json({ status: 200, message: "User Location deleted successfully." })
    }
    catch (error) {
        return res.status(400).json({ message: error.message });
    }
};


module.exports = {
    addUserLocation,
    fetchAllUsersLocations,
    fetchUserLocationById,
    updateUserLocation,
    deleteUserLocation
}