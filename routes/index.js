const router = require("express").Router();
const userRouter = require("../modules/users/user.route")
const blogRouter = require ("../modules//blogs/blog.route")
const bookmarkRouter =require("../modules/bookmarks/bookmark.route");
router.get("/", (res, req, next) => {
  try {
    res.json({data:null,msg:"api is working"})
  } catch (e) {
    next(e);
  }
});

router.use("/bookmarks",bookmarkRouter);
router.use("/users",userRouter)
router.use("/blogs",blogRouter)

module.exports = router;
