const express= require("express");
const router = express.Router();
const cartController = require("../controllers/cart-controller");
const auth = require("../middleware/auth");

router.use(auth);

router.get("/", cartController.getCart);
router.post("/", cartController.addToCart);
router.put("/:id", cartController.updateCart);
router.delete("/:id", cartController.deleteCart);

//paypal
router.post("/create-order", cartController.createOrder);
router.get("/capture-order", cartController.captureOrder);



module.exports = router;