const prisma = require("../../utils/prisma");
require("dotenv").config();


// Add Vendor Bank Account
const addBankDetails = async (req, res) => {
    /*
       Add vendor bank details in the BankDetails DB table.
       Body:
           {
                "vendorId": Int,
                "bankName": Str,
                "accountName": Str,
                "accountNumber": Str,
                "ifsc": Str,
                "accountType": Str,
                "bankBranch": Str
           }
       
       Response:
           Returns success with 200 status code.
       {
    "status": 200,
    "data": {
                "bankId": Int,
                "vendorId": Int,
                "bankName": Str,
                "accountName": Str,
                "accountNumber": Str,
                "ifsc": Str,
                "accountType": Str,
                "bankBranch": Str
            },
    "message": "Vendor bank details added successfully."
}
       */
    try {
        const { vendorId, bankName, accountName, accountNumber, ifsc, accountType, bankBranch } = req.body;

        const vendor = await prisma.vendorProfile.findUnique({
            where: {
                vendorId: vendorId
            }
        });

        if (vendor) {
            const newBankDetails = await prisma.bankDetails.create({
                data: {
                    vendorId: vendorId,
                    bankName: bankName,
                    accountName: accountName,
                    accountNumber: accountNumber,
                    ifsc: ifsc,
                    accountType: accountType,
                    bankBranch: bankBranch
                }
            });
            return res.json({ status: 200, data: newBankDetails, message: "Vendor bank details added successfully." })
        } else {
            return res.status(403).json({ message: "Adding bank details failed." })
        }
    }
    catch (error) {
        return res.status(400).json({ message: error.message });
    }
};


// Fetch all Vendors Bank Details
const fetchAllBankDetails = async (req, res) => {
    /*
    Displays all the vendors Bank details in BankDetails DB table.
    response:
        Returns success with 200 status code.
    {
    "status": 200,
    "data": [
        {
            "bankId": Int,
            "vendorId": Int,
            "bankName": Str,
            "accountName": Str,
            "accountNumber": Str,
            "ifsc": Str,
            "accountType": Str,
            "bankBranch": Str
        },
        .
        .
        {
            "bankId": Int,
            "vendorId": Int,
            "bankName": Str,
            "accountName": Str,
            "accountNumber": Str,
            "ifsc": Str,
            "accountType": Str,
            "bankBranch": Str
        }
    ],
    "Here we get": "All Vendors bank details."
}
    */
    try {
        const vendors = await prisma.bankDetails.findMany();
        return res.json({ status: 200, data: vendors, "Here we get": "All Vendors bank details." });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};


// Fetch Vendor Bank by ID
const fetchVendorBankById = async (req, res) => {
    /*
       Displays the vendor Bank Details by bankId in BankDetails DB table.
       Params:
           path-parameter:
               bankId: Int
   
       Response:
           Returns success with 200 status code.
       {
    "status": 200,
    "data": {
                "bankId": Int,
                "vendorId": Int,
                "bankName": Str,
                "accountName": Str,
                "accountNumber": Str,
                "ifsc": Str,
                "accountType": Str,
                "bankBranch": Str
            },
    "Here we get": "The Vendor bank details."
}
       */
    try {
        const bankId = req.params.id;
        const bank = await prisma.bankDetails.findFirst({
            where: {
                bankId: bankId
            },
        });
        return res.json({ status: 200, data: bank, "Here we get": "The Vendor bank details." })
    }
    catch (error) {
        return res.status(400).json({ message: error.message });
    }
};


// Update Vendor Bank Details by ID
const updateVendorBankDetails = async (req, res) => {
    /*
    Updates the vendor by vendorId.
        Params:
           path-parameter:
               vendorId: Int

        Body:
        {
            "vendorId": Int,
            "bankName": Str,
            "accountName": Str,
            "accountNumber": Str,
            "ifsc": Str,
            "accountType": Str,
            "bankBranch": Str
        }

        Response:
            Returns success with 200 status code.
        {
    "status": 200,
    "data": {
                "bankId": Int,
                "vendorId": Int,
                "bankName": Str,
                "accountName": Str,
                "accountNumber": Str,
                "ifsc": Str,
                "accountType": Str,
                "bankBranch": Str
            },
    "message": "Vendor bank details updated successfully."
}
    */
    try {
        const bankId = req.params.id;
        const { vendorId, bankName, accountName, accountNumber, ifsc, accountType, bankBranch } = req.body;

        const updatedVendorBankDetails = await prisma.bankDetails.update({
            where: {
                bankId: bankId
            },
            data: {
                vendorId: vendorId,
                bankName,
                accountName,
                accountNumber,
                ifsc,
                accountType,
                bankBranch
            }
        });

        return res.json({ status: 200, data: updatedVendorBankDetails, message: "Vendor bank details updated successfully." })
    }
    catch (error) {
        return res.status(400).json({ message: error.message });
    }
};


// Delete Vendor bank details by ID
const deleteVendorBankDetails = async (req, res) => {
    /*
    Deletes the vendor bank details by bankId.
        Params:
           path-parameter:
               bankId: Int

        Response:
            Returns success with 200 status code.
        {
            "status": 200,
            "message": "Vendor bank details deleted successfully."
        }
    */
    try {
        const bankId = req.params.id;
        await prisma.bankDetails.deleteMany({
            where: {
                bankId: bankId
            }
        });
        return res.json({ status: 200, message: "Vendor bank details deleted successfully." })
    }
    catch (error) {
        return res.status(400).json({ message: error.message });
    }
};



module.exports = {
    addBankDetails,
    fetchAllBankDetails,
    fetchVendorBankById,
    updateVendorBankDetails,
    deleteVendorBankDetails
}