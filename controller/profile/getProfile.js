const { User } = require("../../db/connection")

const getProfile = async (req, res) => {
    let { userId } = req.body

    try {
        const resp = await User.find({ id: userId })
        res.status(201).json(
            {
                "success": true,
                "id": userId,
                "message": "Profile fetched successfully",
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

module.exports = { getProfile }