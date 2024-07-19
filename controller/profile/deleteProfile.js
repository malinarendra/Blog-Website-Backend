const { User, Blog } = require("../../db/connection")
const {deleteImage} = require("../../cloudinary/cloudinary")


const deleteProfile = async (req, res) => {
    const { userId, imagePublicId } = req.body

    try {
        let result = await deleteImage(imagePublicId)// first delete image of particular blog
        if (result.success === true) {
            await User.deleteOne({ id: userId })
            await Blog.deleteMany({ userId: userId })
            res.status(201).json(
                {
                    "success": true,
                    "message": "Profile deleted successfully",
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

module.exports = { deleteProfile }