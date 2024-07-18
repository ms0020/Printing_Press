const { Router } = require("express");
const controller = require("./userController")

const router = Router();


router.post("/register", controller.register);
router.post("/all_users", controller.fetchAllUsers);
router.post("/:id/user_by_id", controller.fetchUserById);
router.put("/:id/update_user", controller.updateUser);
router.delete("/:id/delete_user", controller.deleteUser);


module.exports = router;