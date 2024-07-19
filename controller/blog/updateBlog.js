const { deleteImage, uploadImage } = require("../../cloudinary/cloudinary");
const { Blog } = require("../../db/connection")

const updateBlog = async (req, res) => {
    const { blogId, imagePublicId, title, content, tag, status, imageStatus } = req.body;

    // when image will update ->
    // 1. delete image
    // 2. upload new image 
    // 3. update blog by all data 

    if (imageStatus === "true") {// change the image and other fields

        try {
            await deleteImage(imagePublicId)

            let { optimizeUrl, public_id } = await uploadImage(req.file.buffer)

            await Blog.updateOne(
                { id: blogId },
                {
                    $set: {
                        blogImageUrl: optimizeUrl,
                        imagePublicId: public_id,
                        title,
                        content,
                        tag: tag.toLowerCase(),
                        lastEditDate: new Date(),
                        status: status.toLowerCase()
                    }
                }
            )

            res.status(201).json(
                {
                    "success": true,
                    "message": "Blog updated successfully"
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

    } else {// don't change image updated other fields
        try {

            await Blog.updateOne(
                { id: blogId },
                {
                    $set: {
                        title,
                        content,
                        tag: tag.toLowerCase(),
                        lastEditDate: new Date(),
                        status: status.toLowerCase()
                    }
                }
            )

            res.status(201).json(
                {
                    "success": true,
                    "message": "Blog updated successfully"
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

    // when image will not change
    // 1. update blog by all data except image

}

module.exports = { updateBlog }