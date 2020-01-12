const aws = require("aws-sdk");
const getTruncatedTime = () => {
  const currentTime = new Date();
  const d = new Date(currentTime);

  d.setMinutes(Math.floor(d.getMinutes() / 10) * 10);
  d.setSeconds(0);
  d.setMilliseconds(0);

  return d;
};

module.exports = {
  getSignedUrl: function(key) {
    const AWS = require("aws-sdk");
    const tk = require("timekeeper");

    const s3 = new AWS.S3();

    // round the time to the last 10-minute mark

    // cache-friendly signing
    console.log("Using freeze");
    return tk.withFreeze(getTruncatedTime(), () => {
      return s3.getSignedUrl("getObject", {
        Bucket: "amorindia",
        Key: key,
        Expires: 1
      });
    });
  }
};
