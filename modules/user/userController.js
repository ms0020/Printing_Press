const prisma = require("../../utils/prisma");
require("dotenv").config();

const bcrypt = require("bcrypt");
const saltRounds = 10;

// Create New User
const register = async (req, res) => {
    /*
     Add user in the User DB table.
    Body:
        {
            "name":Str,
            "contactNo": Str,
            "email": Str,
            "password": Str,
            "role": Str
        }
    
    Response:
        Returns success with 200 status code.
    "data": {
                "userId": Int,
                "userName": Str,
                "contactNo": Str,
                "email": Str,
                "password": Str,
                "role": Str,
                "createdAt": DateTime,
                "updatedAt": DateTime
            },
    "msg": "User Added."
    */
    try {
        const { name, contactNo, email } = req.body;
        const { role } = req.body;

        //   if (role === 'customer') {
        //     // Handle customer registration
        //     res.send('Customer registration');
        //   } else if (role === 'vendor') {
        //     // Handle vendor registration
        //     res.send('Vendor registration');
        //   } else if (role === 'admin') {
        //     // Handle admin registration
        //     res.send('Admin registration');
        //   } else {
        //     // Invalid role
        //     res.status(400).send('Invalid role');
        //   }
        const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

        const findUser = await prisma.user.findUnique({
            where: {
                email: email
            }
        });

        if (findUser) {
            return res.json({ status: 400, message: "Email already exist. Please use another one." })
        }

        const newUser = await prisma.user.create({
            data: {
                userName: name,
                contactNo: contactNo,
                email: email,
                password: hashedPassword,
                role: role
            }
        });
        return res.json({ status: 200, data: newUser, msg: "User created." })
    }
    catch (error) {
        return res.status(400).json({ message: error.message });
    }
};


// Fetch All Users
const fetchAllUsers = async (req, res) => {
    /*
   Displays all the users in User DB table.
   response:
       Returns success with 200 status code.
   "data": [
        {
           "userId": Int,
           "userName": Str,
           "contactNo": Str,
           "email": Str,
           "password": Str,
           "role": Str,
           "createdAt": DateTime,
           "updatedAt": DateTime
       },
       .
       .
       {
           "userId": Int,
           "userName": Str,
           "contactNo": Str,
           "email": Str,
           "password": Str,
           "role": "Str,
           "createdAt": DateTime,
           "updatedAt": DateTime
       }
   ],
   "Here we get": "All Users."
}
   */
    try {
        const users = await prisma.user.findMany();

        return res.json({ status: 200, data: users, "Here we get": "All Users." })
    }
    catch (error) {
        return res.status(400).json({ message: error.message });
    }
};


// Fetch User by ID
const fetchUserById = async (req, res) => {
    /*
       Displays the user by userrId in User DB table.
       Params:
           path-parameter:
               userId: Int
   
       Response:
           Returns success with 200 status code.
       "data": {
                    "userId": Int,
                    "userName": Str,
                    "contactNo": Str,
                    "email": Str,
                    "password": Str,
                    "role": Str,
                    "createdAt": Datetime,
                    "updatedAt": DateTime
               },
           "Here we get": "The User."
   }
       */
    try {
        const userId = req.params.id;
        const user = await prisma.user.findFirst({
            where: {
                userId: userId
            },
        });
        return res.json({ status: 200, data: user, "Here we get": "The User." })
    }
    catch (error) {
        return res.status(400).json({ message: error.message });
    }

};


// Update User by ID
const updateUser = async (req, res) => {
    /*
     Updates the user by userId.
         Params:
            path-parameter:
                userId: Int
 
         Body:
         {
             "userName":Str,
             "contactNo": Str,
             "email": str,
             "password": str,
             "role": Str
         }
 
         Response:
             Returns success with 200 status code.
         {
             "status": 200,
             "data": {
                         "userId": Int,
                         "userName": str,
                         "contactNo": Str,
                         "email": Str,
                         "password": Str,
                         "role": Str,
                         "createdAt": Str,
                         "updatedAt": Str
                     },
             "message": "User updated successfully."
 }
     */
    try {
        const userId = req.params.id;
        const { userName, contactNo, email, role } = req.body;
        const newHashedPassword = await bcrypt.hash(req.body.password, saltRounds);

        const updatedUser = await prisma.user.update({
            where: {
                userId: userId
            },
            data: {
                userName,
                contactNo,
                email,
                password: newHashedPassword,
                role,
                updatedAt: new Date()
            }
        });

        return res.json({ status: 200, data: updatedUser, message: "User updated successfully." })
    }
    catch (error) {
        return res.status(400).json({ message: error.message });
    }
};


// Delete User
const deleteUser = async (req, res) => {
    /*
    Deletes the uerr by userId.
        Params:
           path-parameter:
               userId: Int

        Response:
            Returns success with 200 status code.
        {
            "status": 200,
            "message": "User deleted successfully."
        }
    */
    try {
        const userId = req.params.id;
        await prisma.user.deleteMany({
            where: {
                userId: userId
            }
        });
        return res.json({ status: 200, message: "User deleted successfully." })
    }
    catch (error) {
        return res.status(400).json({ message: error.message });
    }
};


module.exports = {
    register,
    fetchAllUsers,
    fetchUserById,
    updateUser,
    deleteUser
};
