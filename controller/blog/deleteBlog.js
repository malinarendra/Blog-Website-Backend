const { deleteImage } = require("../../cloudinary/cloudinary");
const { Blog } = require("../../db/connection")

const deleteBlog = async (req, res) => {
    let { blogId, imagePublicId } = req.body

    try {
        let result = await deleteImage(imagePublicId)// first delete image of particular blog
        if (result.success === true) {
            await Blog.deleteOne({ id: blogId })
            res.status(201).json(
                {
                    "success": true,
                    "message": "Blog deleted successfully",
                }
            );
        } else {
            res.status(500).json(
                {
                    "success": false,
                    "error": {
                        "code": "500",
                        "message": "Internal Server Error, blog not deleted successfully",
                        "details": "An unexpected error occurred while processing your request. Please try again later."
                    }
                }
            );
        }
    } catch (e) {
        res.status(500).json(
            {
                "success": false,
                "error": {
                    "code": "500",
                    "message": "Internal Server Error, blog not deleted successfully",
                    "details": "An unexpected error occurred while processing your request. Please try again later."
                }
            }
        );
    }
}

module.exports = { deleteBlog }