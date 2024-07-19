const cloudinary = require('cloudinary').v2;

const connectToCloudinary = () => {
    cloudinary.config({
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.CLOUD_API_KEY,
        api_secret: process.env.CLOUD_API_SECRET
    });
};

const getPublicId = () => {
    let str = "abcdefghijklmnopqrstuvwxyz";
    let id = "";
    for (let i = 0; i < 5; i++) {
        id += str[Math.floor(Math.random() * str.length)];
    }
    let date = new Date()
    id += `${date.getHours()}_${date.getMinutes()}_${date.getSeconds()}_${date.getMilliseconds()}`
    return id;
};


// Function to delete an image by public_id
const deleteImage = async (public_id) => {
    try {
        connectToCloudinary();
        
        const result = await cloudinary.uploader.destroy(public_id);
        
        if (result.result === 'ok') {
            return {
                success: true,
                message: 'Image deleted successfully',
                public_id
            };
        } else {
            console.log('Failed to delete image:', result);
            return {
                success: false,
                message: 'Failed to delete image',
                details: result
            };
        }
    } catch (error) {
        return {
            success: false,
            message: 'Error deleting image',
            error: error.message
        };
    }
};

const uploadImage = (buffer) => {
    connectToCloudinary();

    return new Promise((resolve, reject) => {
        const public_id = getPublicId();

        const upload_stream = cloudinary.uploader.upload_stream(
            { public_id: public_id},
            (error, result) => {
                if (error) {
                    return reject(error);
                }

                const transformationUrl = cloudinary.url(public_id, {
                    fetch_format: 'auto',
                    quality: 'auto'
                });

                const optimizeUrl = cloudinary.url(public_id, {
                    crop: 'auto',
                    gravity: 'auto',
                    width: 500,
                    height: 500,
                });
                resolve({ optimizeUrl, public_id });
            }
        );

        upload_stream.end(buffer);
    });
};

module.exports = { uploadImage, deleteImage };
