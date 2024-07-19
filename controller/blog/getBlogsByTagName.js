const { Blog } = require("../../db/connection")

const getBlogsByTagName = async (req,res) => {
    let { tagName } = req.body
    tagName=tagName.toLowerCase()

    try {
        const resp = await Blog.find({tag:tagName})
        res.status(201).json(
            {
                "success": true,
                "tag":tagName,
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

module.exports = { getBlogsByTagName }