const router = require("express").Router();
const userController = require("./user.controller");
const { upload } = require("../../utils/multer");
const {registerSchema,registerValidation} = require("./user.validation")
const {secureAPI} = require("../../utils/secure")


// Corrected the parameter order: (req, res, next)
router.get("/", secureAPI(["admin"]),(req, res, next) => {
  try {
    res.json({ data: null, msg: "user list generated succesfully" });
  } catch (e) {
    next(e);
  }
});

router.post("/register",upload.single("image"),registerValidation ,async (req, res, next) => {
  try {
    if (req.file){
      const image = req.file.path.replace("public","")
      req.body.image = image;
    }
    const result = await userController.register(req.body);
    res.json({ data: result, msg: "User registered successfully" });
  } catch (e) {
    next(e);
  }
});
router.post("/login",async (req, res, next) => {
  try {
    const result = await userController.login(req.body);
    res.json({ data: result, msg: "User login successfully" });
  } catch (e) {
    next(e);
  }
});
router.post("/verify-email",async (req, res, next) => {
  try {
    const {email,token}=req.body;
    if(!email||!token) throw new Error("email or token missing");
    const result = await userController.verifyEmail(req.body);
    res.json({ data: result, msg: "Email verified sucessfully" });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
