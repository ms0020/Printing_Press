const  Router  = require("express");
const controller  = require("./authController")

const router = Router();


router.post('/login', controller.userLogin);

module.exports = router;