const { Blog } = require("../../db/connection");
const { uploadImage } = require("../../cloudinary/cloudinary");

const getBlogId = () => {
    let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let id = "";
    for (let i = 0; i < 10; i++) {
        id += str[Math.floor(Math.random() * str.length)];
    }
    let date = new Date()
    id += `${date.getHours()}_${date.getMinutes()}_${date.getSeconds()}_${date.getMilliseconds()}`
    return id;
}

const postBlog = async (req, res) => {
    const { userId, title, content, tag, status, fname, lname } = req.body;

    const blogId = await getBlogId();
    const dateCreated = new Date();

    try {
        const uploadResult = await uploadImage(req.file.buffer);

        let obj = {
            id: blogId,
            userId,
            blogImageUrl: uploadResult.optimizeUrl,
            imagePublicId: uploadResult.public_id,
            title,
            content,
            tag: tag.toLowerCase(),
            dateCreated,
            status: status.toLowerCase(),
            fname,
            lname
        };

        let data = new Blog(obj);
        await data.save();// saving post to mongodb database
        res.status(201).json(
            {
                "success": true,
                "message": "Blog post successfully created",
                "post": obj
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
};

module.exports = { postBlog, getBlogId };
