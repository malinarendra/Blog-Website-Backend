const { User } = require("../../db/connection")
const { CryptoJS } = require("./createProfile")
const { hashPassword } = require("./createProfile")
const secretKey = process.env.SECRET_KEY_CRYPTO

const checkPassword = (oldPassword, userDatabaseObj) => {
    let { password } = userDatabaseObj

    // decrypting password stored in database
    let bytesPassword = CryptoJS.AES.decrypt(password, secretKey)
    var originalPassword = bytesPassword.toString(CryptoJS.enc.Utf8);

    // comparing password
    if (originalPassword === oldPassword) {
        return true
    } else {
        return false
    }
}

const changePassword = async (req, res) => {
    const { userId, oldPassword, newPassword } = req.body

    // assuming oldPassword from frontend will be already decrypt

    let userDatabaseObj = await User.find({ id: userId })

    try {
        let result = await checkPassword(oldPassword, userDatabaseObj[0])

        if (result === true) {

            let newHashedPassword = hashPassword(newPassword)

            await User.updateOne(
                { id: userId },
                {
                    $set:
                        { password: newHashedPassword }
                }
            )

            res.status(201).json(
                {
                    "success": true,
                    "message": "Password changed successfully",
                }
            );

        } else {
            res.status(201).json(
                {
                    success: false,
                    message: "Old password is not matching"
                }
            )
        }

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

module.exports = { changePassword }