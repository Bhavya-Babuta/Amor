module.exports = {
  success: function(body) {
    return buildResponse(200, body);
  },
  failure: function(body, errorCode = 500) {
    return buildResponse(errorCode, body);
  }
};

function buildResponse(statusCode, body) {
  return {
    statusCode: statusCode,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
      "Access-Control-Request-Method": "*"
    },
    body: JSON.stringify(body)
  };
}
