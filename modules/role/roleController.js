const prisma = require("../../utils/prisma");
require("dotenv").config();


// Add Roles
const addRole = async (req, res) => {
    /*
    Add role in the Role DB table.
    Body:
        {
            "roleName": Str
        }

    Response:
        Returns success with 200 status code.
    "status": 200,
    "data": {
                "roleId": Int,
                "roleName": Str
            },
    "msg": "Role Added."
    */
    try {
        const { roleName } = req.body;

        const newRole = await prisma.role.create({
            data: {
                roleName: roleName
            }
        });
        return res.json({ status: 200, data: newRole, msg: "Role Added." })
    }
    catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

// fetch all Roles
const fetchAllRoles = async (req, res) => {
    /*
    Displays all the roles in Role DB table.
    Response:
        Returns success with 200 status code.
    "status": 200,
    "data": [
        {
            "roleId": Int,
            "roleName": Str
        },
        {
            "roleId": Int,
            "roleName": Str
        },
        {
            "roleId": int,
            "roleName": Str
        }
    ],
    "Here we get": "All Roles."
}
    */
    try {
        const roles = await prisma.role.findMany();

        return res.json({ status: 200, data: roles, "Here we get": "All Roles." })
    }
    catch (error) {
        return res.status(400).json({ message: error.message });
    }
};


// Fetch Role by Role Name
const fetchRoleByName = async (req, res) => {
    /*
    Displays the role from Role DB table.
    Body"
        {
            "roleName": "C"
        }

    Response:
        Returns success with 200 status code.
    {
    "status": 200,
    "data": {
                "roleId": 2,
                "roleName": "Customer"
            },
    "Here we get": "The Role."
}
    */
    try {
        const { roleName } = req.body;
        const getRole = await prisma.role.findFirst({
            where: {
                roleName: {
                    contains: roleName
                }
            },
        });
        return res.json({ status: 200, data: getRole, "Here we get": "The Role." })
    }
    catch (error) {
        return res.status(400).json({ message: error.message });
    }
};


// Update Role
const updateRole = async (req, res) => {
    /*
    Update the role in Role DB table.
    Params:
        path-parameter:
               roleId: Int
    
    Body:
    {
        "roleName": Str
    }

    Response:
    {
    "status": 200,
    "data": {
                "roleId": 3,
                "roleName": "Admin"
            },
    "message": "Role updated successfully."
}
     */
    try {
        const roleId = req.params.id;
        const { roleName } = req.body;

        const updatedRole = await prisma.role.update({
            where: {
                roleId: roleId
            },
            data: {
                roleName
            }
        });

        return res.json({ status: 200, data: updatedRole, message: "Role updated successfully." })
    }
    catch (error) {
        return res.status(400).json({ message: error.message });
    }
};


// Delete Role by ID
const deleteRole = async (req, res) => {
    /*
    Delete role from the Role DB
    Params:
        path-parameter:
               roleId: Int

    Response:
        Returns success with 200 status code.
    {
        "status": 200,
        "message": "Role deleted successfully."
    }
    */
    try {
        const roleId = req.params.id;

        await prisma.role.deleteMany({
            where: {
                roleId: roleId
            }
        });
        return res.json({ status: 200, message: "Role deleted successfully." })
    }
    catch (error) {
        return res.status(400).json({ message: error.message });
    }
};



module.exports = {
    addRole,
    fetchAllRoles,
    fetchRoleByName,
    updateRole,
    deleteRole

}