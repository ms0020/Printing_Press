const { Router } = require("express");
const controller = require("./bankDetailsController")

const router = Router();


router.post("/add_vendor_bank_details", controller.addBankDetails);
router.post("/all_vendors_bank_details", controller.fetchAllBankDetails);
router.post("/:id/vendor_bank_by_id", controller.fetchVendorBankById);
router.put("/:id/update_vendor_bank_details", controller.updateVendorBankDetails);
router.delete("/:id/delete_vendor_bank_details", controller.deleteVendorBankDetails);


module.exports = router;