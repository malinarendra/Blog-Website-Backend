const { User } = require("../../db/connection")
const { deleteImage, uploadImage } = require("../../cloudinary/cloudinary")

const updateProfile = async (req, res) => {
    const { userId, imagePublicId, fname, lname, email, imageStatus } = req.body;

    // when image will update ->
    // 1. delete image
    // 2. upload new image 
    // 3. update blog by all data 

    if (imageStatus === "true") {// change the image and other fields

        try {
            await deleteImage(imagePublicId)

            let { optimizeUrl, public_id } = await uploadImage(req.file.buffer)

            await User.updateOne(
                { id: userId },
                {
                    $set: {
                        fname: fname.toLowerCase(),
                        lname: lname.toLowerCase(),
                        email,
                        profileImageUrl: optimizeUrl,
                        imagePublicId: public_id,
                        lastUpdated: new Date()
                    }
                }
            )

            res.status(201).json(
                {
                    "success": true,
                    "message": "Profile updated successfully"
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

            await User.updateOne(
                { id: userId },
                {
                    $set: {
                        fname: fname.toLowerCase(),
                        lname: lname.toLowerCase(),
                        email,
                        lastUpdated: new Date()
                    }
                }
            )

            res.status(201).json(
                {
                    "success": true,
                    "message": "Profile updated successfully"
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

module.exports = { updateProfile }