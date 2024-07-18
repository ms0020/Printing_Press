const { Router } = require("express");
const controller = require("./adminConfigController")

const router = Router();


router.post("/add_admin_config", controller.addAdminConfig);
router.post("/all_adminConfigs", controller.fetchAllAdminConfigs);
router.post("/:id/adminConfig_by_id", controller.fetchAdminConfigById);
router.put("/:id/update_adminConfig", controller.updateAdminConfigById);
router.delete("/:id/delete_adminConfig", controller.deleteAdminConfigById);


module.exports = router;