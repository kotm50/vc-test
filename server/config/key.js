if (process.env.NODE_ENV === "production") {
  //배포중
  module.exports = require("./production.js");
} else {
  //개발중
  module.exports = require("./dev.js");
}
