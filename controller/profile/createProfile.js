const { User } = require("../../db/connection")
const { getBlogId } = require("../blog/postBlog")
const { uploadImage } = require("../../cloudinary/cloudinary")
const { generateJSONWebToken } = require("../../jsonwebtoken/jsonwebtoken")
const CryptoJS = require("crypto-js");
const secretKey = process.env.SECRET_KEY_CRYPTO

const hashPassword = (password) => {
    let ciphertext = CryptoJS.AES.encrypt(password, secretKey).toString();
    return ciphertext
}

const createProfile = async (req, res) => {
    const { fname, lname, email, password } = req.body

    const id = await getBlogId()// getBlogId function can alse be use for creating user id
    const dateJoined = new Date()
    const newHashedPassword = await hashPassword(password)

    try {
        const { optimizeUrl, public_id } = await uploadImage(req.file.buffer);

        let obj = {
            id,
            fname: fname.toLowerCase(),
            lname: lname.toLowerCase(),
            email,
            password: newHashedPassword,
            image: optimizeUrl,
            imagePublicId: public_id,
            dateJoined
        };

        let data = new User(obj);

        await data.save();// saving profile to mongodb database

        let payload = {
            id,
            fname: fname.toLowerCase(),
            lname: lname.toLowerCase(),
            email
        }

        let token = await generateJSONWebToken(payload)

        res
            .status(201)
            .cookie(
                "Authorization",
                `Bearer ${token}`,
                {
                    httpOnly: true
                }
            )
            .json(
                {
                    "success": true,
                    "message": "Profile successfully created",
                    "data": {
                        ...obj,
                        token
                    }

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

module.exports = { createProfile, CryptoJS, hashPassword }