const { Blog, User } = require("../../db/connection")

const getSingleBlog = async (req, res) => {
    let { blogId } = req.body

    try {
        let resp = await Blog.find({ id: blogId })
        res.status(201).json(
            {
                "success": true,
                "id": blogId,
                "message": "Blog fetched successfully",
                data: resp
            }
        );
    } catch (e) {
        res.status(500).json(
            {
                "success": false,
                "error": {
                    "code": "500",
                    "message": "Internal Server Error",
                    "details": "An unexpected error occurred while processing your request. Please try again later."
                }
            }
        );
    }
}

module.exports = { getSingleBlog }