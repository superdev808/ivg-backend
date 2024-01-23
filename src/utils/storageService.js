const multer = require('multer');
const multerS3 = require('multer-s3');
const AWS = require('aws-sdk');

const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
});

const uploadToS3 = (userId,cat, fileName) => {
    return multer({
        storage: multerS3({
            s3: s3,
            bucket: process.env.AWS_BUCKET_NAME,
            key: function (req, file, cb) {
                const key  = generateFileKey(userId, cat, fileName, file);
                cb(null, key);
            }
        })
    });
};

const generateFileKey = (userId, cat, fileName, file) => {
    const fileExtension = file.originalname.split('.').pop();
    const key = `${cat}/${fileName}/${fileName}-${userId}.${fileExtension}`;
    return key;
}

function generateSignedUrl( objectKey) {
    const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: objectKey,
        Expires: 60 
    };

    return s3.getSignedUrl('getObject', params);
}

module.exports = {uploadToS3,generateFileKey, generateSignedUrl};