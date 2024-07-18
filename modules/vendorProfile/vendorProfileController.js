const prisma = require("../../utils/prisma");
require("dotenv").config();


// Add Vendor
const addVendor = async (req, res) => {
    /*
    Add vendor in the VendorProfile DB table.
    Body:
        {
            "userId": Int,
            "serviceArea": Str,
            "vendorRating": Float
        }
    
    Response:
        Returns success with 200 status code.
    "data": {
                "vendorId": Int,
                "userId": Int,
                "serviceArea": Str,
                "vendorRating": Float
            },
    "msg": "Vendor Added."
}
    */
    try {
        const { userId, serviceArea, primaryLocation, status, registrationStatus, vendorRating } = req.body;

        const user = await prisma.user.findUnique({
            where: {
                userId: userId
            },
            select: {
                role: true
            }
        });

        if (user && user.role === "Vendor") {
            const newVendor = await prisma.vendorProfile.create({
                data: {
                    userId: userId,
                    serviceArea: serviceArea,
                    primaryLocation: primaryLocation,
                    status: status,
                    registrationStatus: registrationStatus,
                    vendorRating: vendorRating,
                }
            });
            return res.json({ status: 200, data: newVendor, msg: "Vendor Added." });
        } else {
            return res.status(403).json({ message: "User is not authorized." });
        }
    }
    catch (error) {
        return res.status(400).json({ message: error.message });
    }
};


// Fetch All Vendors
const fetchAllVendors = async (req, res) => {
    /*
    Displays all the vendors in VendorProfile DB table.
    response:
        Returns success with 200 status code.
    "data": [
        {
            "vendorId": Int,
            "userId": Int,
            "serviceArea": Str,
            "vendorRating": Float
        },
        .
        .
        .
        {
            "vendorId": Int,
            "userId": Int,
            "serviceArea": Str,
            "vendorRating": Float
        }
    ],
    "Here we get": "All Vendors."
}
    */
    try {
        const vendors = await prisma.vendorProfile.findMany();
        return res.json({ status: 200, data: vendors, "Here we get": "All Vendors." });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};


// Fetch Vendor by ID
const fetchVendorById = async (req, res) => {
    /*
       Displays the vendor by vendorId in VendorProfile DB table.
       Params:
           path-parameter:
               vendorId: Int
   
       Response:
           Returns success with 200 status code.
       "data": {
                   "vendorId": Int,
                   "userId": Int,
                   "serviceArea": Str,
                   "vendorRating": Float
               },
           "Here we get": "The Vendor."
   }
       */
    try {
        const vendorId = req.params.id;
        const vendor = await prisma.vendorProfile.findFirst({
            where: {
                vendorId: vendorId
            },
        });
        return res.json({ status: 200, data: vendor, "Here we get": "The Vendor." })
    }
    catch (error) {
        return res.status(400).json({ message: error.message });
    }

};


// Update Vendor by ID
const updateVendorProfile = async (req, res) => {
    /*
    Updates the vendor by vendorId.
        Params:
           path-parameter:
               vendorId: Int

        Body:
        {
            "userId": Int,
            "serviceArea": Str,
            "vendorRating": Float
        }

        Response:
            Returns success with 200 status code.
        {
            "status": 200,
            "data": {
                        "vendorId": Int,
                        "userId": Int,
                        "serviceArea": Str,
                        "vendorRating": Float
                    },
            "message": "Vendor updated successfully."
}
    */
    try {
        const vendorId = req.params.id;
        const { userId, serviceArea, status, primaryLocation, registrationStatus, vendorRating } = req.body;

        const updatedVendor = await prisma.vendorProfile.update({
            where: {
                vendorId: vendorId
            },
            data: {
                userId: userId,
                serviceArea,
                primaryLocation: primaryLocation,
                status,
                registrationStatus,
                vendorRating,
            }
        });

        return res.json({ status: 200, data: updatedVendor, message: "Vendor updated successfully." })
    }
    catch (error) {
        return res.status(400).json({ message: error.message });
    }
};


// Delete Vendor by ID
const deleteVendor = async (req, res) => {
    /*
    Deletes the vendor by vendorId.
        Params:
           path-parameter:
               vendorId: Int

        Response:
            Returns success with 200 status code.
        {
            "status": 200,
            "message": "Vendor deleted successfully."
        }
    */
    try {
        const vendorId = req.params.id;
        await prisma.vendorProfile.deleteMany({
            where: {
                vendorId: vendorId
            }
        });
        return res.json({ status: 200, message: "Vendor deleted successfully." })
    }
    catch (error) {
        return res.status(400).json({ message: error.message });
    }
};


module.exports = {
    addVendor,
    fetchAllVendors,
    fetchVendorById,
    updateVendorProfile,
    deleteVendor
}