const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
    cloud_name : process.env.CLOUD_NAME ,
    api_secret : process.env.CLOUD_API_SECRET,
    api_key :  process.env.CLOUD_API_KEY ,
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'stayease_DEV',
      allowerdFormats : ["jpg" , "png" , "jpeg"] , // supports promises as well
    },
  });


  module.exports = {cloudinary , storage}