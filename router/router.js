const router = require("express").Router()

// import controllers

//blog
const { upload } = require("../multer/multer")
const { getAllBlogs } = require("../controller/blog/getAllBlogs")
const { getBlogsByTagName } = require("../controller/blog/getBlogsByTagName")
const { getSingleBlog } = require("../controller/blog/getSingleBlog")
const { getOwnBlogs } = require("../controller/blog/getOwnBlogs")
const { postBlog } = require("../controller/blog/postBlog")
const { deleteBlog } = require("../controller/blog/deleteBlog")
const { updateBlog } = require("../controller/blog/updateBlog")

// profile
const { createProfile } = require("../controller/profile/createProfile")
const { getProfile } = require("../controller/profile/getProfile")
const { updateProfile } = require("../controller/profile/updateProfile")
const { deleteProfile } = require("../controller/profile/deleteProfile")
const { changePassword } = require("../controller/profile/changePassword")

// authentication
const { login } = require("../controller/authentication/login")
const { logout } = require("../controller/authentication/logout")

// middleware
const { checkJSONWebToken } = require("../jsonwebtoken/jsonwebtoken")


// blog routes
router.post("/blog", [upload.single("blogImage")], postBlog)// post blog
router.get("/blogs", getAllBlogs)// get all blogs
router.post("/blogs-tag-name", getBlogsByTagName)// get all blogs by tagname
router.post("/blogs-single", getSingleBlog)// get single blog by id
router.post("/blogs-user", getOwnBlogs)// get all blogs of particular user
router.delete("/blog", deleteBlog)// delete blog
router.put("/blog", [checkJSONWebToken, upload.single("blogImage")], updateBlog)

// profile routes
router.post("/profile", [upload.single("profileImage")], createProfile)
router.get("/profile", checkJSONWebToken, getProfile)
router.put("/profile", [checkJSONWebToken, upload.single("profileImage")], updateProfile)
router.delete("/profile", checkJSONWebToken, deleteProfile)
router.post("/profile/change-password", checkJSONWebToken, changePassword)

// authentication routes
router.post("/login", login)
router.get("/logout", logout)

module.exports = { router }