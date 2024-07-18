const prisma = require("../../utils/prisma");
require("dotenv").config();


// Add Admin Configurations
const addAdminConfig = async (req, res) => {
    /*
     Add adminConfig in the AdminConfiguration DB table.
    Body:
        {
            "configKey": Str,
            "configValue": Str,
            "lastModifiedBy": Int
        }
    
    Response:
        Returns success with 200 status code.
    {
    "status": 200,
    "data": {
                "configId": Int,
                "configKey": Str,
                "configValue": Str,
                "lastModifiedBy": Int,
                "lastModifiedAt": DateTime
            },
    "msg": "Admin Configurations Added."
}
    */
    try {
        const { configKey, configValue, lastModifiedBy } = req.body;

        const newAdminConfig = await prisma.adminConfiguration.create({
            data: {
                configKey: configKey,
                configValue: configValue,
                lastModifiedBy: lastModifiedBy,
                lastModifiedAt: new Date()
            }
        });
        return res.json({ status: 200, data: newAdminConfig, msg: "Admin Configurations Added." })
    }
    catch (error) {
        return res.status(400).json({ message: error.message });
    }
};


// Fetch all Admin Configurations
const fetchAllAdminConfigs = async (req, res) => {
    /*
    Displays all the adminConfigs in AdminConfiguration DB table.
    response:
        Returns success with 200 status code.
    {
    "status": 200,
    "data": [
        {
            "configId": Int,
            "configKey": Str,
            "configValue": Str,
            "lastModifiedBy": Int,
            "lastModifiedAt": DateTime
        },
        .
        .
        {
            "configId": Int,
            "configKey": Str,
            "configValue": Str,
            "lastModifiedBy": Int,
            "lastModifiedAt": DateTime
        }
    ],
    "Here we get": "All Admin Configurations."
}
    */
    try {
        const adminConfigs = await prisma.adminConfiguration.findMany()
        return res.json({ status: 200, data: adminConfigs, "Here we get": "All Admin Configurations." });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};


// Fetch Admin Configuration by ID
const fetchAdminConfigById = async (req, res) => {
    /*
    Displays the adminConfig by configId in AdminConfiguration DB table.
       Params:
           path-parameter:
               configid: Int
   
       Response:
           Returns success with 200 status code.
       "data": {
                    "configId": Int,
                    "configKey": Str,
                    "configValue": Str,
                    "lastModifiedBy": Int,
                    "lastModifiedAt": DateTime
                }
           "Here we get": "The Admin Configuration."
    }
    */
    try {
        const configId = req.params.id;
        const adminConfig = await prisma.adminConfiguration.findFirst({
            where: {
                configId: configId
            },
        });
        return res.json({ status: 200, data: adminConfig, "Here we get": "The Admin Configuration." })
    }
    catch (error) {
        return res.status(400).json({ message: error.message });
    }
};


// Update Admin Configuration by ID
const updateAdminConfigById = async (req, res) => {
    /*
    Updates the vendor by vendorId.
        Params:
           path-parameter:
               configId: Int

        Body:
        {
            "configKey": "New Random Key wxyz",
            "configValue": "New Key Value wxyz",
            "lastModifiedBy": 10
        }

        Response:
            Returns success with 200 status code.
        {
            "status": 200,
            "data": {
                        "configId": 4,
                        "configKey": "New Random Key wxyz",
                        "configValue": "New Key Value wxyz",
                        "lastModifiedBy": 10,
                        "lastModifiedAt": "2024-05-08T16:34:57.153Z"
                    },
            "message": "Admin Configuration updated successfully."
}
    */
    try {
        const configId = req.params.id;
        const { configKey, configValue, lastModifiedBy } = req.body;

        const updatedAdminConfig = await prisma.adminConfiguration.update({
            where: {
                configId: configId
            },
            data: {
                configKey,
                configValue,
                lastModifiedBy: lastModifiedBy,
            }
        });

        return res.json({ status: 200, data: updatedAdminConfig, message: "Admin Configuration updated successfully." })
    }
    catch (error) {
        return res.status(400).json({ message: error.message });
    }
};


// Delete Admin Configuration by ID
const deleteAdminConfigById = async (req, res) => {
    /*
    Deletes the vendor by vendorId.
        Params:
           path-parameter:
               configId: Int

        Response:
            Returns success with 200 status code.
        {
            "status": 200,
            "message": "Admin Configuration deleted successfully."
        }
    */
    try {
        const configId = req.params.id;
        await prisma.adminConfiguration.deleteMany({
            where: {
                configId: configId
            }
        });
        return res.json({ status: 200, message: "Admin Configuration deleted successfully." })
    }
    catch (error) {
        return res.status(400).json({ message: error.message });
    }
};


module.exports = {
    addAdminConfig,
    fetchAllAdminConfigs,
    fetchAdminConfigById,
    updateAdminConfigById,
    deleteAdminConfigById
}