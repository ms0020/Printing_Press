const { Router } = require("express");
const controller = require("./vendorProfileController")

const router = Router();


router.post("/add_vendor", controller.addVendor);
router.post("/all_vendors", controller.fetchAllVendors);
router.post("/:id/vendor_by_id", controller.fetchVendorById);
router.put("/:id/update_vendor", controller.updateVendorProfile);
router.delete("/:id/delete_vendor", controller.deleteVendor);


module.exports = router;