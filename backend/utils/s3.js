const aws = require("aws-sdk");
const s3 = new aws.S3({});

module.exports = {
  getBannerImages: async function () {
    var params = {
      Bucket: process.env.BUCKET_NAME,
      Prefix: process.env.BANNER_OBJECT_NAME,
    };
    return await s3
      .listObjects(params)
      .promise()
      .then((objects) => {
        return objects.Contents.map((element) => {
          return {
            bannerImageSrc: `${process.env.CLOUDFRONT_URL}${element.Key}`,
          };
        });
      });
  },
};
