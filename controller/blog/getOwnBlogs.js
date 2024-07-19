const { Blog } = require("../../db/connection")

const getOwnBlogs = async (req, res) => {
    let { userId } = req.body

    try {
        const resp = await Blog.find({ userId : userId })
        res.status(201).json(
            {
                "success": true,
                "message": "Blogs fetched successfully",
                totalBlogs: resp.length,
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

module.exports = { getOwnBlogs }