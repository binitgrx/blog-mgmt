const router = require("express").Router();
const userController = require("./user.controller");
const { upload } = require("../../utils/multer");

// Corrected the parameter order: (req, res, next)
router.get("/", (req, res, next) => {
  try {
    res.json({ data: null, msg: "API is working" });
  } catch (e) {
    next(e);
  }
});

router.post("/register", upload.single("image"), async (req, res, next) => {
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

module.exports = router;
