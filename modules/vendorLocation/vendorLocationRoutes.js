const { Router } = require("express");
const controller = require("./vendorLocationController")

const router = Router();


router.post("/add_vendor_location", controller.addUserLocation);
router.post("/all_vendors_locations", controller.fetchAllUsersLocations);
router.post("/:id/vendor_location_by_id", controller.fetchUserLocationById);
router.put("/:id/update_vendor_location", controller.updateUserLocation);
router.delete("/:id/delete_vendor_location", controller.deleteUserLocation);


module.exports = router;