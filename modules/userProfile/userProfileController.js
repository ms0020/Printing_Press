const prisma = require("../../utils/prisma");
require("dotenv").config();


// Add User
const addUser = async (req, res) => {
    /*
    Add user in the UserProfile DB table.
    Body:
        {
                "userId": Int,
                "firstName": Str,
                "lastName": Str,
                "primaryLocation": Str,
                "address": str,
                "city": Str,
                "country": Str
        }
    
    Response:
        Returns success with 200 status code.
    "data": {
                "profileId": Int,
                "userId": Int,
                "firstName": Str,
                "lastName": Str,
                "primaryLocation": Str,
                "address": str,
                "city": Str,
                "country": Str
            },
    "msg": "User Added."
}
    */
    try {
        const { userId, firstName, lastName, primaryLocation, address, city, country } = req.body;

        const newUser = await prisma.userProfile.create({
            data: {
                userId: userId,
                firstName: firstName,
                lastName: lastName,
                primaryLocation: primaryLocation,
                address: address,
                city: city,
                country: country
            }
        });
        return res.json({ status: 200, data: newUser, msg: "User Added." })
    }
    catch (error) {
        return res.status(400).json({ message: error.message });
    }
};


// Fetch All Users
const fetchAllUsers = async (req, res) => {
    /*
    Displays all the users in UserProfile DB table.
    response:
        Returns success with 200 status code.
    "data": [
        {
            "profileId": Int,
            "userId": Int,
            "firstName": Str,
            "lastName": Str,
            "address": Str
        },
        .
        .
        .
        {
            "profileId": Int,
            "userId": Int,
            "firstName": Str,
            "lastName": Str,
            "address": Str
        }
    ],
    "Here we get": "All Users."
}
    */
    try {
        const users = await prisma.userProfile.findMany();

        return res.json({ status: 200, data: users, "Here we get": "All Users." })
    }
    catch (error) {
        return res.status(400).json({ message: error.message });
    }
};


// Fetch User by ID
const fetchUserById = async (req, res) => {
    /*
    Displays the user by vendorId in UserProfile DB table.
       Params:
           path-parameter:
               userId: Int
   
       Response:
           Returns success with 200 status code.
       "data": {
                    "profileId": Int,
                    "userId": Int,
                    "firstName": Str,
                    "lastName": Str,
                    "address": Str
               },
           "Here we get": "The User."
   }
    */
    try {
        const profileId = req.params.id;
        const user = await prisma.userProfile.findFirst({
            where: {
                profileId: profileId
            },
        });
        return res.json({ status: 200, data: user, "Here we get": "The User." })
    }
    catch (error) {
        return res.status(400).json({ message: error.message });
    }

};


// Update User by ID
const updateUserProfile = async (req, res) => {
    /*
   Updates the user by profileId.
       Params:
          path-parameter:
              vendorId: Int

       Body:
       {
                "userId": Int,
                "firstName": Str,
                "lastName": Str,
                "primaryLocation": Str
                "address": Str,
                "city": Str,
                "country": Str
       }

       Response:
           Returns success with 200 status code.
       {
    "status": 200,
    "data": {
                "profileId": Int,
                "userId": Int,
                "firstName": Str,
                "lastName": Str,
                "primaryLocation": Str
                "address": Str,
                "city": Str,
                "country": Str
            },
    "message": "User updated successfully."
}
   */
    try {
        const profileId = req.params.id;
        const { userId, firstName, lastName, primaryLocation, address, city, country } = req.body;

        const updatedUser = await prisma.userProfile.update({
            where: {
                profileId: profileId
            },
            data: {
                userId: userId,
                firstName,
                lastName,
                primaryLocation,
                address,
                city,
                country
            }
        });

        return res.json({ status: 200, data: updatedUser, message: "User updated successfully." })
    }
    catch (error) {
        return res.status(400).json({ message: error.message });
    }
};


// Delete User by ID
const deleteUser = async (req, res) => {
    /*
     Deletes the vendor by vendorId.
        Params:
           path-parameter:
               profileId: Int

        Response:
            Returns success with 200 status code.
        {
            "status": 200,
            "message": "User Profile deleted successfully."
        }
    */
    try {
        const profileId = req.params.id;
        await prisma.userProfile.deleteMany({
            where: {
                profileId: profileId
            }
        });
        return res.json({ status: 200, message: "User deleted successfully." })
    }
    catch (error) {
        return res.status(400).json({ message: error.message });
    }
};


module.exports = {
    addUser,
    fetchAllUsers,
    fetchUserById,
    updateUserProfile,
    deleteUser
}