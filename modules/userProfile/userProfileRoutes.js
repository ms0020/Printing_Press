const { Router } = require("express");
const controller = require("./userProfileController")

const router = Router();


router.post("/add_user", controller.addUser);
router.post("/all_user_profiles", controller.fetchAllUsers);
router.post("/:id/user_profile_by_id", controller.fetchUserById);
router.put("/:id/update_user_profile", controller.updateUserProfile);
router.delete("/:id/delete_user_profile", controller.deleteUser);


module.exports = router;