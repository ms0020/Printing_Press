const express = require('express');
const cors = require("cors");

const authRoutes = require('./modules/authentication/authRoutes.js');
const userRoutes = require('./modules/user/userRoutes.js');
const userProfileRoutes = require('./modules/userProfile/userProfileRoutes.js');
const roleRoutes = require('./modules/role/roleRoutes.js');
const vendorProfileRoutes = require('./modules/vendorProfile/vendorProfileRoutes.js');
const vendorLocationRoutes = require('./modules/vendorLocation/vendorLocationRoutes.js');
const adminConfigRoutes = require('./modules/adminConfiguration/adminConfigRoutes.js');
const documentRoutes = require('./Modules/vendorDocuments/vendorDocumentRoutes.js')
const bankDetailsRoutes = require('./modules/bankDetails/bankDetailsRoutes.js');

let allowedOrigins = ["*"];

const router = express();
router.use(


  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        let msg =
          "The CORS policy for this site does not " +
          "allow access from the specified Origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
  })
);

router.use("/api/auth", authRoutes);
router.use("/api/user", userRoutes);
router.use("/api/userProfile", userProfileRoutes);
router.use("/api/role", roleRoutes);
router.use("/api/vendorProfile", vendorProfileRoutes);
router.use("/api/vendorLocation", vendorLocationRoutes);
router.use("/api/adminConfig", adminConfigRoutes);
router.use("/api/documents", documentRoutes);
router.use("/api/bankDetails", bankDetailsRoutes);

module.exports = router;