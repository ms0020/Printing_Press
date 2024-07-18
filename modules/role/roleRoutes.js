const { Router } = require("express");
const controller = require("./roleController")

const router = Router();


router.post("/add_role", controller.addRole);
router.post("/all_roles", controller.fetchAllRoles);
router.post("/role_by_name", controller.fetchRoleByName);
router.put("/:id/update_role", controller.updateRole);
router.delete("/:id/delete_role", controller.deleteRole);


module.exports = router;