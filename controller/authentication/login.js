const { User } = require("../../db/connection")
const CryptoJS = require("crypto-js");
const { generateJSONWebToken } = require("../../jsonwebtoken/jsonwebtoken")


// function to check password of user
const checkLoginPassword = (password, encryptedPassword) => {

    // decrypting password stored in database
    let bytesPassword = CryptoJS.AES.decrypt(encryptedPassword, process.env.SECRET_KEY_CRYPTO)
    let decryptedPassword = bytesPassword.toString(CryptoJS.enc.Utf8);
    // console.table([password,decryptedPassword])

    if (password === decryptedPassword) {
        return true
    } else {
        return false
    }


}


const login = async (req, res) => {
    const { username, password } = req.body// here username is email

    try {
        const result = await User.find({ email: username })
        let profile = result[0]

        if (result.length === 0) {
            res
                .status(200)
                .json(
                    {
                        success: false,
                        message: "User not found!"
                    }
                )
        } else {
            let encryptedPassword = profile.password
            let passwordResult = checkLoginPassword(password, encryptedPassword)
            // console.log(passwordResult)

            if (passwordResult) {// password is correct
                let payload = {
                    id: profile.id,
                    fname: profile.fname,
                    lname: profile.lname,
                    email: profile.email,
                    image: profile.image,
                    imagePublicId:profile.imagePublicId
                }
                // generate json webtoken
                const token = await generateJSONWebToken(payload)

                // send response and store token in cookie of user
                res
                    .status(200)
                    .cookie(
                        "Authorization",
                        `Bearer ${token}`,
                        {
                            httpOnly: true
                        }
                    )
                    .json(
                        {
                            success: true,
                            message: "login successfull",
                            data: {
                                ...payload,
                                token
                            }
                        }
                    )


            } else {// password is incorrect
                res
                    .status(200)
                    .json(
                        {
                            success: false,
                            message: "Invalid credintials!"
                        }
                    )
            }

        }
    } catch (e) {
        res
            .status(501)
            .json(
                {
                    success: false,
                    message: "Internal server error"
                }
            )
    }

}

module.exports = { login }