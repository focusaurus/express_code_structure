var config = {};
var PRODUCTION = process.env.NODE_ENV === "production";

config.express = {
  port: process.env.PORT || 3000,
  ip: "127.0.0.1"
};

module.exports = config;
