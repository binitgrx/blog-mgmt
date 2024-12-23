const router = require("express").Router();
const userRouter = require("../modules/users/user.route")
router.get("/", (res, req, next) => {
  try {
    res.json({data:null,msg:"api is working"})
  } catch (e) {
    next(e);
  }
});

router.use("/users",userRouter)

module.exports = router;
